from django.apps import AppConfig
from django.db.models.signals import post_migrate


class AdminInterfaceConfig(AppConfig):
    name = "maps_admin"
    verbose_name = "Maps admin"
    default_auto_field = "django.db.models.AutoField"

    def ready(self):
        # from admin_interface import settings
        # from admin_interface.models import Theme
        #
        # settings.check_installed_apps()
        # post_migrate.connect(Theme.post_migrate_handler, sender=self)
        pass
