from django.db import models
# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class RoomType(models.Model):
    ROOM_CHOICES = (
        ("STANDARD","STANDARD"),
        ("DELUXE", "DELUXE"),
        ("SUPER_DELUXE", "SUPER_DELUXE")
    )
    name = models.CharField(max_length=50, default="STANDARD", choices=ROOM_CHOICES, unique=True)
    description = models.TextField(blank=True)
    price_per_night = models.DecimalField(max_digits=6, decimal_places=2)
    max_guests = models.IntegerField(default=2)


    def __str__(self):
        return f"{self.name} - ${self.price_per_night}/night"


class Room(models.Model):
    room_number = models.CharField(max_length=10, unique=True)
    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE, related_name="rooms")
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"Room {self.room_number} ({self.room_type})"


class Guest(models.Model):
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=255)
    id_number = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.name


class Booking(models.Model):
    guests = models.ManyToManyField(Guest, related_name="bookings")  # Changed to Many-to-Many relationship
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name="bookings")
    check_in = models.DateTimeField()
    check_out = models.DateTimeField()
    is_cancelled = models.BooleanField(default=False)

    def __str__(self):
        return f"Booking by {self.guest} for {self.room}"

    def total_cost(self):
        duration = (self.check_out - self.check_in).days
        return self.room.room_type.price_per_night * duration


class Payment(models.Model):
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name="payment")
    amount = models.DecimalField(max_digits=6, decimal_places=2)
    timestamp = models.DateTimeField(default=timezone.now)
    is_successful = models.BooleanField(default=True)

    def __str__(self):
        return f"Payment of ${self.amount} for {self.booking}"
