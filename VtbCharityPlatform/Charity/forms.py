from django import forms
from .models import Donation


class DonationForm(forms.ModelForm):
    class Meta:
        model = Donation
        fields = ['amount', 'donor_name']
        widgets = {
            'amount': forms.NumberInput(attrs={
                'placeholder': 'Введите сумму',
                'min': '1',
                'step': '1'
            }),
            'donor_name': forms.TextInput(attrs={
                'placeholder': 'Как к вам обращаться?'
            }),
        }
        labels = {
            'amount': 'Сумма пожертвования',
            'donor_name': 'Ваше имя'
        }
