import json
from datetime import timedelta

from django.db.models.aggregates import Sum, Avg
from django.db.models.functions import TruncDay
from django.shortcuts import render, get_object_or_404
from django.views.generic.dates import timezone

from .forms import DonationForm
from .models import Project, Donation


def index(request):
    total_amount = Project.objects.aggregate(Sum('current_amount'))['current_amount__sum'] or 0
    projects = Project.objects.all()
    return render(request, 'index.html', context={
        'total_amount': total_amount,
        'projects': projects,
    })

def project_page(request, pk):
    project = get_object_or_404(Project, pk=pk)
    if request.method == 'POST':
        form = DonationForm(request.POST)
        if form.is_valid():
            donation = form.save(commit=False)
            donation.project = project
            donation.save()
            project.current_amount += donation.amount
            project.save()
            return render(request, 'donation_success.html', context={
                'project': project,
                'donation': donation
            })
    else:
        form = DonationForm()
    return render(request, 'project_detail.html', context={
        'project': project,
        'form': form,
    })


def statistics_page(request):
    total_donations = Project.objects.aggregate(Sum('current_amount'))['current_amount__sum'] or 0
    projects_count = Project.objects.count()
    total_donors = Donation.objects.values('donor_name').distinct().count()
    avg_donation = Donation.objects.aggregate(avg=Avg('amount'))['avg'] or 0

    projects = Project.objects.all().order_by('id')
    today = timezone.now().date()
    days_ago = today - timedelta(days=30)
    daily_donations = Donation.objects.filter(
        date__gte=days_ago
    ).annotate(
        day=TruncDay('date')
    ).values('day').annotate(
        total=Sum('amount')
    ).order_by('day')

    daily_labels_list = [donation['day'].strftime('%d.%m') for donation in daily_donations]
    daily_data_list = [float(donation['total']) for donation in daily_donations]
    daily_labels = json.dumps(daily_labels_list) if daily_labels_list else '[]'
    daily_data = json.dumps(daily_data_list) if daily_data_list else '[]'

    projects_labels_list = [project.title for project in projects]
    projects_data_list = [float(project.current_amount) for project in projects]
    projects_labels = json.dumps(projects_labels_list, ensure_ascii=False) if projects_labels_list else '[]'
    projects_data = json.dumps(projects_data_list) if projects_data_list else '[]'

    projects_daily_data = {}
    for project in projects:
        project_daily = Donation.objects.filter(
            project=project,
            date__gte=days_ago
        ).annotate(
            day=TruncDay('date')
        ).values('day').annotate(
            total=Sum('amount')
        ).order_by('day')
        
        project_data_dict = {donation['day'].strftime('%d.%m'): float(donation['total']) for donation in project_daily}
        projects_daily_data[project.title] = [project_data_dict.get(label, 0.0) for label in daily_labels_list]
    
    projects_daily_json = json.dumps(projects_daily_data, ensure_ascii=False)

    return render(request, 'statistics.html', {
        'total_donations': total_donations,
        'projects_count': projects_count,
        'total_donors': total_donors,
        'avg_donation': round(avg_donation, 2),
        'daily_labels': daily_labels,
        'daily_data': daily_data,
        'projects_labels': projects_labels,
        'projects_data': projects_data,
        'projects_daily_data': projects_daily_json,
    })
