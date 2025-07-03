from django.urls import path
from rest_framework import routers
from .api import WBViewSet
from .views import *

urlpatterns = [
    path('products/', WBView.as_view(), name='products'),
    path('product-count-reviews/', ProductCountReviewsView.as_view(), name='product-count-reviews'),
    path('product-count-rating/', ProductCountRatingView.as_view(), name='product-count-rating'),
    path('product-count-sale/', ProductSaleView.as_view(), name='product-count-sale'),
    path('product-count-reviews-sale/', ProductReviewsSaleView.as_view(), name='product-reviews-sale'),


]
