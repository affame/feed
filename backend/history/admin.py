from django.contrib import admin

from config.admin import admin_site
from history.models import History


class HistoryAdmin(admin.ModelAdmin):
    list_display = (
        "object_id", "status", "object", "action_at", "actor_badge"
    )
    search_fields = (
        "object", "object_id", "status", "actor_badge"
    )

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        return False


admin_site.register(History, HistoryAdmin)
