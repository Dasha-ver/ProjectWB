from django.urls import path
from rest_framework import routers
from .api import WBViewSet
from .views import *

urlpatterns = [
    path('products/', WBView.as_view(), name='products'),
    path('product-count/', ProductCountView.as_view(), name='product-count'),
]
