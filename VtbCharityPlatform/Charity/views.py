from django.db.models.aggregates import Sum
from django.shortcuts import render, get_object_or_404

from .forms import DonationForm
from .models import Project, Donation


# Create your views here.
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
