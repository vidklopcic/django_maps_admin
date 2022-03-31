import inspect

from django import forms


class MapsAdminMarkerField(forms.NumberInput):
    def __init__(self, lat, lng):
        super().__init__(attrs={
            'data-maps-admin': 'marker',
            'data-maps-admin-lat': lat.field.attname,
            'data-maps-admin-lng': lng.field.attname,
        })


class MapsAdminLineField(forms.Textarea):
    def __init__(self, color, weight, dash_array, line_cap, line_join):
        super().__init__(attrs={
            'data-maps-admin': 'line',
            'data-maps-admin-weight': weight.field.attname,
            'data-maps-admin-color': color.field.attname,
            'data-maps-admin-dash-array': dash_array.field.attname,
            'data-maps-admin-line-cap': line_cap.field.attname,
            'data-maps-admin-line-join': line_join.field.attname,
            'rows': 4,
            'cols': 90
        })


class MapsAdminPolygonField(forms.Textarea):
    def __init__(self, color, fill_color, weight, dash_array, line_cap, line_join):
        super().__init__(attrs={
            'data-maps-admin': 'polygon',
            'data-maps-admin-weight': weight.field.attname,
            'data-maps-admin-color': color.field.attname,
            'data-maps-admin-fill-color': fill_color.field.attname,
            'data-maps-admin-dash-array': dash_array.field.attname,
            'data-maps-admin-line-cap': line_cap.field.attname,
            'data-maps-admin-line-join': line_join.field.attname,
            'rows': 4,
            'cols': 90
        })


class MapsAdminDashArrayField(forms.Textarea):
    def __init__(self):
        super().__init__(attrs={
            'data-maps-admin': 'dash-array',
            'rows': 1,
            'cols': 90
        })
