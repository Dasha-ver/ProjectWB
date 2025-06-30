from django.http import JsonResponse
from django.views import View
from .models import WBTable
from rest_framework import generics
from .serializers import WBSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter


class WBView(generics.ListAPIView):
    queryset = WBTable.objects.all()
    serializer_class = WBSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = {
        "reviews_count": ["range", "gte", "lte"],
        "price": ["range", "gte", "lte"],
        "rating": ["range", "gte", "lte"],
    }
    ordering_fields = ['name', 'rating', 'discount_price', 'reviews_count']

class ProductCountView(View):
    def get(self, request, *args, **kwargs):
        price_from = request.GET.get('price_from', 0)
        price_to = request.GET.get('price_to', 0)
        rating = request.GET.get('rating', 0)
        product_count = WBTable.objects.filter(price__range=(price_from,price_to), rating__gte=rating).count()  # Подсчёт количества записей в таблице
        return JsonResponse({'product_count': product_count})
