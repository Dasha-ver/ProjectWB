from .models import WBTable
from rest_framework import viewsets, permissions, generics
from .serializers import WBSerializer


class WBViewSet(viewsets.ModelViewSet):
    queryset = WBTable.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = WBSerializer
