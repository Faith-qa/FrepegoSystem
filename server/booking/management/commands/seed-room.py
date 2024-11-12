from django.core.management.base import BaseCommand, CommandError
from booking.models import Room, RoomType
import pandas as pd
import os

csv_filepath = os.path.join(os.path.dirname(__file__), 'rooms.csv')

class Command(BaseCommand):
    help = "seed the database with data from csv file"

    def handle(self, *args, **options):
        # load csv
        #csv_filepath = 'menuItems.csv'
        df = pd.read_csv(csv_filepath)

        for _, row in df.iterrows():
            try:
                room_type = RoomType.objects.get(name=row["room_type"])
                Room.objects.create(
                    room_number=row['name'],
                    room_type= room_type
               )
            except RoomType.DoesNotExist:
                self.stdout.write(self.style.ERROR(f"RoomType '{row['room_type_name']}' does not exist."))
                continue


        self.stdout.write(self.style.SUCCESS('Database seeded'))



