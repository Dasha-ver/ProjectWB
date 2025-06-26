from django.contrib import admin
from .models import WBTable

class WBAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'price', 'discount_price', 'rating', 'reviews_count']
    search_fields = ['name']

admin.site.register(WBTable, WBAdmin)