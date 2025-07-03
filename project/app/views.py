from types import NoneType

from django.core import serializers
from django.http import JsonResponse, HttpResponse
from django.views import View
from .models import WBTable
from rest_framework import generics
from .serializers import WBSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from django.db.models import F, Avg


class WBView(generics.ListAPIView):
    queryset = WBTable.objects.all()
    serializer_class = WBSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = {
        "reviews_count": ["range", "gte", "lte"],
        "price": ["range", "gte", "lte"],
        "rating": ["in", "range", "gte", "lte"],
    }
    ordering_fields = ['name', 'rating', 'discount_price', 'reviews_count']

class ProductCountRatingView(View):
    def get(self, request, *args, **kwargs):
        price_from = request.GET.get('price_from', 0)
        price_to = request.GET.get('price_to', 0)
        rating = request.GET.get('rating', 0)
        product_count = WBTable.objects.filter(price__range=(price_from,price_to), rating__gte=rating).count()
        return JsonResponse({'product_count': product_count})

class ProductCountReviewsView(View):
    def get(self, request, *args, **kwargs):
        price_from = request.GET.get('price_from', 0)
        price_to = request.GET.get('price_to', 0)
        reviews = request.GET.get('reviews', 0)
        product_count = WBTable.objects.filter(price__range=(price_from,price_to), reviews_count__gte=reviews).count()
        return JsonResponse({'product_count': product_count})

class ProductSaleView(View):
    def get(self, request, *args, **kwargs):
        rating = request.GET.get('rating', 0)
        sale =  WBTable.objects.annotate(
            price_difference= (F('price')/F('discount_price')*100)-100
        )

        filtered_posts = sale.filter(rating__gte=rating)
        average_sale = filtered_posts.aggregate(average_sale=Avg('price_difference'))

        return JsonResponse(int(average_sale['average_sale']), safe=False)

class ProductReviewsSaleView(View):
    def get(self, request, *args, **kwargs):
        reviews = request.GET.get('reviews', 0)
        rating_from = request.GET.get('rating_from', 0)
        rating_to = request.GET.get('rating_to', 0)
        sale =  WBTable.objects.annotate(
            price_difference= (F('price')/F('discount_price')*100)-100
        )
        filtered_posts = sale.filter(reviews_count__gte=reviews, rating__range=(rating_from,rating_to))
        if filtered_posts.exists():
            average_sale = filtered_posts.aggregate(average_sale=Avg('price_difference'))
            return JsonResponse(int(average_sale['average_sale']), safe=False)
        else:
            return JsonResponse(0, safe=False)

