from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ("cashier", "Cashier"),
        ("waiter", "Waiter"),
        ("manager", "Manager")
    )
    email = models.EmailField(blank=False, max_length=255, verbose_name="email address")
    role_type = models.CharField(max_length=255, choices=ROLE_CHOICES, default="waiter")
    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"
