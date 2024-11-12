from django.core.management.base import BaseCommand, CommandError
import pandas as pd
from booking.models import RoomType
import os

csv_filepath = os.path.join(os.path.dirname(__file__), '')

data = [
    {"name": "STANDARD","price_per_night":2000, "description": "A cozy space with a queen-size bed, free Wi-Fi, flat-screen TV, and essential amenities for a comfortable stay."},
    {"name": "DELUXE","price_per_night":2500, "description": "Spacious and refined, with a king-size bed, seating area, and enhanced amenities for added comfort and style."},
    {"name": "SUPER_DELUXE","price_per_night":3000, "description": "Luxuriously appointed with a king-size bed, lounge area, and premium bathroom, perfect for a truly indulgent stay."},

]

class Command(BaseCommand):
    help = "seed the database with data from csv file"
    def handle(self, *args, **options):
       for item in data:
           RoomType.objects.create(
               name=item["name"],
               price_per_night=item["price_per_night"],
               description=item["description"]
           )
       self.stdout.write(self.style.SUCCESS('Database seeded'))


