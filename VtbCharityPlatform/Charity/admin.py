from django.contrib import admin

from Charity.models import Project, Donation


# Register your models here.
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', "target_amount", 'current_amount')


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ('project', 'amount', 'donor_name')
