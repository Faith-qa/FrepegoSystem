from django.core.management.base import BaseCommand, CommandError
from barRestaurant.models import MenuItem
import pandas as pd
import os

csv_filepath = os.path.join(os.path.dirname(__file__), 'MenuItems.csv')

class Command(BaseCommand):
    help = "seed the database with data from csv file"

    def handle(self, *args, **options):
        # load csv
        #csv_filepath = 'menuItems.csv'
        df = pd.read_csv(csv_filepath)

        for _, row in df.iterrows():
            MenuItem.objects.create(
                title = row['title'],
                description = row['description'],
                price = row['price'],
                image = row['image'],
                category = row['category']
            )
        self.stdout.write(self.style.SUCCESS('Database seeded'))



