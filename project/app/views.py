from .models import WBTable
from rest_framework import generics
from .serializers import WBSerializer
from django_filters.rest_framework import DjangoFilterBackend


class WBView(generics.ListAPIView):
    queryset = WBTable.objects.all()
    serializer_class = WBSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        "reviews_count": ["range", "gte", "lte"],
        "price": ["range", "gte", "lte"],
        "rating": ["range", "gte", "lte"],
    }
