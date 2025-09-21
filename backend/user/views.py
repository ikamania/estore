from rest_framework.decorators import action
from rest_framework.response import Response
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

        return [permissions.IsAuthenticated()] 

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)

        return Response(serializer.data)

