from rest_framework import permissions, viewsets
from .models import User

from user.serializers import UserSerializer


# API endpoinsts
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
        
    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]

        return [permissions.AllowAny()] # allow any request

