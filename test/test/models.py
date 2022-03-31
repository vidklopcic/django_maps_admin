from colorfield.fields import ColorField
from django.db import models

import maps_admin.models


class MapsMarker(maps_admin.models.MapsMarker):
    pass


class MapsLine(maps_admin.models.MapsLine):
    pass


class MapsPolygon(maps_admin.models.MapsPolygon):
    pass
