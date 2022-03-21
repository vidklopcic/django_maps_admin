from django.contrib import admin
from .models import *


@admin.register(MapsLine)
class MapsLineAdmin(admin.ModelAdmin):
    pass
