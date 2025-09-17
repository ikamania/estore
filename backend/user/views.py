from rest_framework import permissions, viewsets
from .models import User

from user.serializers import UserSerializer


# API endpoinsts
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

