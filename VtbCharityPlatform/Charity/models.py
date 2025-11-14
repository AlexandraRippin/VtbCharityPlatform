from django.db import models


# Create your models here.
class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    target_amount = models.DecimalField(decimal_places=2, max_digits=10)
    current_amount = models.DecimalField(decimal_places=2, max_digits=10)


class Donation(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    amount = models.DecimalField(decimal_places=2, max_digits=10)
    donorName = models.CharField(max_length=100)
    date = models.DateField(auto_now_add=True)
