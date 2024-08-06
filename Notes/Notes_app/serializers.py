from rest_framework import serializers
from .models import note

class noteSerializer(serializers.ModelSerializer):
    class Meta:
        model=note
        fields=["id","task","completed"]