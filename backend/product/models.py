from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products")
    name = models.CharField(max_length=30)
    description = models.TextField()
    price = models.PositiveIntegerField()
    category = models.CharField()
    uploaded_at = models.DateTimeField(auto_now_add=True)

