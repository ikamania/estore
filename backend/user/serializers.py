from .models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password']
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

