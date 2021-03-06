# Generated by Django 3.1.7 on 2022-03-31 08:42

import colorfield.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MapsLine',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=255, unique=True)),
                ('color', colorfield.fields.ColorField(default='#FFFFFFFF', image_field=None, max_length=18, samples=None)),
                ('weight', models.FloatField(default=3)),
                ('dash_array', models.JSONField(blank=True, null=True)),
                ('line_cap', models.CharField(choices=[('butt', 'butt'), ('round', 'round'), ('square', 'square'), ('inherit', 'inherit')], default='round', max_length=255)),
                ('line_join', models.CharField(choices=[('miter', 'miter'), ('round', 'round'), ('bevel', 'bevel'), ('inherit', 'inherit')], default='round', max_length=255)),
                ('points', models.JSONField(help_text='[[46.053830, 14.508713], ...] - [[lat, lng], ...]')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
