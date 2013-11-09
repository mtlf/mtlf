from django.contrib import admin

from api.models import CompletionHistory
from api.models import HitGroup
from api.models import Requester
from api.models import Worker


admin.site.register(CompletionHistory)
admin.site.register(HitGroup)
admin.site.register(Requester)
admin.site.register(Worker)
