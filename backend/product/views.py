from rest_framework import viewsets, permissions

from .serializers import ProductSerializer
from .models import Product
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def get_queryset(self):
        user = self.request.user

        if user.is_authenticated:
            return Product.objects.filter(user=user)

        return Product.objects.all()

