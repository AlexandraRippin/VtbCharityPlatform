from django.db.models.aggregates import Sum
from django.shortcuts import render, get_object_or_404

from .models import Project, Donation


# Create your views here.
def index(request):
    total_amount = Donation.objects.aggregate(Sum('amount'))['amount__sum'] or 0
    projects = Project.objects.all()
    return render(request, 'index.html', context={
        'total_amount': total_amount,
        'projects': projects,
    })

def project_page(request, pk):
    project = get_object_or_404(Project, pk=pk)
    return render(request, 'project_detail.html', context={
        'project': project
    })
