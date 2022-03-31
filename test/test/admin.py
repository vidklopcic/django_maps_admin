from django import forms
from django.contrib import admin

from maps_admin.fields import MapsAdminLineField, MapsAdminDashArrayField
from test.models import MapsLine


class MapsLineForm(forms.ModelForm):
    class Meta:
        model = MapsLine
        fields = '__all__'
        widgets = {
            'points': MapsAdminLineField(
                MapsLine.color,
                MapsLine.weight,
                MapsLine.dash_array,
                MapsLine.line_cap,
                MapsLine.line_join,
            ),
            'dash_array': MapsAdminDashArrayField()
        }


@admin.register(MapsLine)
class MapsLineAdmin(admin.ModelAdmin):
    form = MapsLineForm
