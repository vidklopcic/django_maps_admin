from colorfield.fields import ColorField
from django.db import models


class MapsLine(models.Model):
    label = models.CharField(max_length=255, unique=True)
    fill_color = ColorField(format='hexa')
    stroke_color = ColorField(format='hexa')
    points = models.JSONField(help_text='[[46.053830, 14.508713], ...] - [[lat, lng], ...]')

    def __str__(self):
        return self.label
