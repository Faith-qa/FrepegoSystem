# hotel_booking_app/schema.py

import graphene
from graphene_django import DjangoObjectType
from .models import RoomType, Room, Guest, Booking, Payment
from django.contrib.auth.models import User
from graphql import GraphQLError
from datetime import datetime
from django.db import transaction


class RoomTypeType(DjangoObjectType):
    class Meta:
        model = RoomType
        fields = ("id", "name", "description", "price_per_night", "max_guests")


class RoomType(DjangoObjectType):
    class Meta:
        model = Room
        fields = ("id", "room_number", "room_type", "is_available")


class GuestType(DjangoObjectType):
    class Meta:
        model = Guest
        fields = ("id", "name", "phone_number", "id_number")


class BookingType(DjangoObjectType):
    total_cost = graphene.Float()

    class Meta:
        model = Booking
        fields = ("id", "guests", "room", "check_in", "check_out", "is_cancelled", "total_cost")

    def resolve_total_cost(self, info):
        return self.total_cost()


class PaymentType(DjangoObjectType):
    class Meta:
        model = Payment
        fields = ("id", "booking", "amount", "timestamp", "is_successful")


# Queries
class Query(graphene.ObjectType):
    all_rooms = graphene.List(RoomType)
    all_bookings = graphene.List(BookingType)
    booking_by_id = graphene.Field(BookingType, id=graphene.Int(required=True))
    available_rooms = graphene.List(RoomType, room_type=graphene.String(required=True))
    bookings_pending_checkout = graphene.List(BookingType)

    def resolve_bookings_pending_checkout(self, info, **kwargs):
        return Booking.objects.filter(checkout_status="checkout_pending")
    def resolve_available_rooms(self, info, room_type):
        queryset = Room.objects.filter(is_available=True, room_type__name=room_type)
        return queryset

    def resolve_all_rooms(self, info):
        return Room.objects.all()

    def resolve_all_bookings(self, info):
        return Booking.objects.all()

    def resolve_booking_by_id(self, info, id):
        try:
            return Booking.objects.get(id=id)
        except Booking.DoesNotExist:
            raise GraphQLError("Booking not found")


# Mutations
class CreateGuest(graphene.Mutation):
    guest = graphene.Field(GuestType)

    class Arguments:
        name = graphene.String(required=True)
        phone_number = graphene.String(required=True)
        id_number = graphene.String(required=True)

    def mutate(self, info, name, phone_number, id_number):
        # Check if the guest already exists based on the id_number
        existing_guest = Guest.objects.filter(id_number=id_number).first()

        if existing_guest:
            return CreateGuest(guest=existing_guest)

        # If no guest found, create a new one
        new_guest = Guest.objects.create(
            name=name,
            phone_number=phone_number,
            id_number=id_number
        )
        return CreateGuest(guest=new_guest)


class BookingCheckout(graphene.Mutation):
    booking = graphene.Field(BookingType)

    class Argument:
        booking_id = graphene.String(required=True)

    def mutate(self, info, booking_id):

        try:
            booking = Booking.objects.get(id=booking_id)
            # find room
            room = Room.objects.get(id=booking.room.id)
            # update room status
            room.is_available = True
            room.save()
            # update booking checkout status
            booking.checkout_status = "checkout_complete"
            booking.save()
        except Booking.DoesNotExist:
            raise Exception(f"Booking with ${booking_id} does not exist")
        except Room.DoesNotExist:
            raise GraphQLError("Room not found")
        except Exception as e:
            raise GraphQLError(f"An error occurred: {str(e)}")
        return BookingCheckout(booking=booking)
        # update room status to available


class CreateBooking(graphene.Mutation):
    booking = graphene.Field(BookingType)

    class Arguments:
        guest_ids = graphene.List(graphene.String, required=True)  # List of guest IDs
        room_id = graphene.String(required=True)
        check_in = graphene.String(required=True)
        check_out = graphene.String(required=True)

    def mutate(self, info, guest_ids, room_id, check_in, check_out):
        try:
            # Start a transaction
            with transaction.atomic():  # Everything within this block is part of the transaction

                # Retrieve all guests
                guests = Guest.objects.filter(id__in=guest_ids)

                # Ensure that all provided guests exist
                if len(guests) != len(guest_ids):
                    raise GraphQLError("One or more guests not found")

                room = Room.objects.get(id=room_id)
                check_in_date = datetime.fromisoformat(check_in)
                check_out_date = datetime.fromisoformat(check_out)

                if check_in_date >= check_out_date:
                    raise GraphQLError("Check-out date must be after check-in date")

                # Ensure room availability
                if not room.is_available:
                    raise GraphQLError("Room is not available")

                # Ensure the room can accommodate the number of guests
                room_type = room.room_type
                if len(guests) > room_type.max_guests:
                    raise GraphQLError(f"Room can accommodate a maximum of {room_type.max_guests} guests")

                booking = Booking.objects.create(
                    room=room,
                    check_in=check_in_date,
                    check_out=check_out_date,
                    is_cancelled=False
                )

                # Link guests to the booking
                booking.guests.add(*guests)  # This assumes a many-to-many relationship between Booking and Guest

                # Update room availability
                room.is_available = False
                room.save()

                # Commit the transaction if everything is successful
                return CreateBooking(booking=booking)

        except Room.DoesNotExist:
            raise GraphQLError("Room not found")
        except Exception as e:
            # If any error occurs, the transaction is rolled back automatically
            raise GraphQLError(f"An error occurred: {str(e)}")


class CreatePayment(graphene.Mutation):
    payment = graphene.Field(PaymentType)

    class Arguments:
        booking_id = graphene.Int(required=True)
        amount = graphene.Float(required=True)

    def mutate(self, info, booking_id, amount):
        try:
            booking = Booking.objects.get(id=booking_id)
            payment = Payment.objects.create(
                booking=booking,
                amount=amount,
                is_successful=True,
            )

            return CreatePayment(payment=payment)

        except Booking.DoesNotExist:
            raise GraphQLError("Booking not found")


class Mutation(graphene.ObjectType):
    create_booking = CreateBooking.Field()
    create_guest = CreateGuest.Field()
    create_payment = CreatePayment.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
