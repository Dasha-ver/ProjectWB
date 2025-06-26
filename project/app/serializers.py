from rest_framework import serializers
from .models import WBTable

class WBSerializer(serializers.ModelSerializer):
    class Meta:
        model = WBTable
        fields = '__all__'
