from django.core.management.base import BaseCommand, CommandError
from barRestaurant.models import Table


class Command(BaseCommand):
    help = "seed the database with data from csv file"
    def handle(self, *args, **options):
        for i in range(1,11):
            Table.objects.create(
                number=i
            )
        self.stdout.write(self.style.SUCCESS('Database seeded'))



