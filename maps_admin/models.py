from colorfield.fields import ColorField
from django.db import models


class MapsLine(models.Model):
    class LineCap(models.TextChoices):
        butt = 'butt', 'butt'
        round = 'round', 'round'
        square = 'square', 'square'
        inherit = 'inherit', 'inherit'

    class LineJoin(models.TextChoices):
        butt = 'miter', 'miter'
        round = 'round', 'round'
        square = 'bevel', 'bevel'
        inherit = 'inherit', 'inherit'

    label = models.CharField(max_length=255, unique=True)
    color = ColorField(format='hexa')
    weight = models.FloatField(default=3)
    dash_array = models.JSONField(null=True, blank=True)
    line_cap = models.CharField(max_length=255, choices=LineCap.choices, default=LineCap.round)
    line_join = models.CharField(max_length=255, choices=LineJoin.choices, default=LineJoin.round)
    points = models.JSONField(help_text='[[46.053830, 14.508713], ...] - [[lat, lng], ...]')

    def __str__(self):
        return self.label

    class Meta:
        abstract = True


class MapsPolygon(models.Model):
    label = models.CharField(max_length=255, unique=True)
    border_color = ColorField(format='hexa')
    fill_color = ColorField(format='hexa')
    weight = models.FloatField(default=3)
    dash_array = models.JSONField(null=True, blank=True)
    line_cap = models.CharField(max_length=255, choices=MapsLine.LineCap.choices, default=MapsLine.LineCap.round)
    line_join = models.CharField(max_length=255, choices=MapsLine.LineJoin.choices, default=MapsLine.LineJoin.round)
    points = models.JSONField(help_text='[[46.053830, 14.508713], ...] - [[lat, lng], ...]')

    def __str__(self):
        return self.label

    class Meta:
        abstract = True


