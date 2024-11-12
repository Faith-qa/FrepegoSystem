# Generated by Django 4.2.16 on 2024-11-11 12:20

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('check_in', models.DateTimeField()),
                ('check_out', models.DateTimeField()),
                ('is_cancelled', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Guest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('phone_number', models.CharField(max_length=255)),
                ('id_number', models.CharField(max_length=30, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='RoomType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('STANDARD', 'STANDARD'), ('DELUXE', 'DELUXE'), ('SUPER_DELUXE', 'SUPER_DELUXE')], default='STANDARD', max_length=50, unique=True)),
                ('description', models.TextField(blank=True)),
                ('price_per_night', models.DecimalField(decimal_places=2, max_digits=6)),
                ('max_guests', models.IntegerField(default=2)),
            ],
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('room_number', models.CharField(max_length=10, unique=True)),
                ('is_available', models.BooleanField(default=True)),
                ('room_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rooms', to='booking.roomtype')),
            ],
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=6)),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('is_successful', models.BooleanField(default=True)),
                ('booking', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='payment', to='booking.booking')),
            ],
        ),
        migrations.AddField(
            model_name='booking',
            name='guests',
            field=models.ManyToManyField(related_name='bookings', to='booking.guest'),
        ),
        migrations.AddField(
            model_name='booking',
            name='room',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bookings', to='booking.room'),
        ),
    ]