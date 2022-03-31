from django import forms
from django.contrib import admin

from maps_admin.fields import MapsAdminLineField, MapsAdminPolygonField, MapsAdminDashArrayField
from test.models import MapsLine, MapsPolygon


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


class MapsPolygonForm(forms.ModelForm):
    class Meta:
        model = MapsPolygon
        fields = '__all__'
        widgets = {
            'points': MapsAdminPolygonField(
                MapsPolygon.border_color,
                MapsPolygon.fill_color,
                MapsPolygon.weight,
                MapsPolygon.dash_array,
                MapsPolygon.line_cap,
                MapsPolygon.line_join,
            ),
            'dash_array': MapsAdminDashArrayField()
        }


@admin.register(MapsLine)
class MapsLineAdmin(admin.ModelAdmin):
    form = MapsLineForm


@admin.register(MapsPolygon)
class MapsPolygonAdmin(admin.ModelAdmin):
    form = MapsPolygonForm
