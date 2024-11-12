# pos/schema.py
import graphene
from django.db import transaction
from graphene_django.types import DjangoObjectType
from .models import MenuItem, Table, Order, OrderItem
from graphql_jwt.decorators import login_required


class MenuItemType(DjangoObjectType):
    class Meta:
        model = MenuItem


class TableType(DjangoObjectType):
    class Meta:
        model = Table


class OrderType(DjangoObjectType):
    class Meta:
        model = Order
        fields = ("id", "order_number", "table", "created_at", "status", "total_charge", "order_items")


class OrderItemType(DjangoObjectType):
    class Meta:
        model = OrderItem


class Query(graphene.ObjectType):
    all_menu_items = graphene.List(MenuItemType)
    all_tables = graphene.List(TableType)
    order_by_id = graphene.Field(OrderType, id=graphene.Int())
    pending_orders = graphene.List(OrderType)

    #@login_required
    def resolve_all_menu_items(self, info, **kwargs):
        return MenuItem.objects.all()

    #@login_required
    def resolve_all_tables(self, info, **kwargs):
        return Table.objects.all()

    #@login_required
    def resolve_order_by_id(self, info, id):
        return Order.objects.get(pk=id)

    def resolve_pending_orders(self, info, **kwargs):
        return Order.objects.filter(status="pending")


# inpute for create order testing

class OrderItemInput(graphene.InputObjectType):
    menu_item_id = graphene.ID(required=True)
    quantity = graphene.Int(required=True)


class CreateOrderInput(graphene.InputObjectType):
    order_number = graphene.Int()
    table_number = graphene.Int(required=True)
    status = graphene.String(default_value="pending")
    order_items = graphene.List(OrderItemInput, required=True)

class CreateOrder(graphene.Mutation):
    order = graphene.Field(OrderType)

    class Arguments:
        input = CreateOrderInput(required=True)

    def mutate(self, info, input):
        # Start a database transaction
        with transaction.atomic():
            # Fetch the table
            try:
                table = Table.objects.get(number=input.table_number)
            except Table.DoesNotExist:
                raise Exception("Table with specified number does not exist")

            # Create the order
            order = Order.objects.create(
                order_number=input.order_number,
                table=table,
                status=input.status,
                total_charge=0.0  # Placeholder; will calculate below
            )

            # Process each order item
            total_charge = 0
            for item in input.order_items:
                try:
                    menu_item = MenuItem.objects.get(id=item.menu_item_id)
                except MenuItem.DoesNotExist:
                    raise Exception(f"MenuItem with ID {item.menu_item_id} does not exist")

                # Create the OrderItem
                order_item = OrderItem.objects.create(
                    order=order,
                    menu_item=menu_item,
                    quantity=item.quantity
                )
                # Calculate the total charge
                total_charge += menu_item.price * item.quantity

            # Update the total charge of the order
            order.total_charge = total_charge
            order.save()
        return CreateOrder(order=order)

class UpdateOrderStatus(graphene.Mutation):
    order = graphene.Field(OrderType)

    class Arguments:
        order_id = graphene.String(required=True)

    def mutate(self, info, order_id):
        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            raise Exception(f"Order with ${order_id} does not exist")
        order.status = "completed"
        order.save()

        return UpdateOrderStatus(order=order)
class Mutation(graphene.ObjectType):
    createOrder = CreateOrder.Field()
    updateOrderStatus = UpdateOrderStatus.Field()
    #add_order_item = AddOrderItem.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
