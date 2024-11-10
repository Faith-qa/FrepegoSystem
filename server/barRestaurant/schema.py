# pos/schema.py
import graphene
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


class OrderItemType(DjangoObjectType):
    class Meta:
        model = OrderItem


class Query(graphene.ObjectType):
    all_menu_items = graphene.List(MenuItemType)
    all_tables = graphene.List(TableType)
    order_by_id = graphene.Field(OrderType, id=graphene.Int())

    @login_required
    def resolve_all_menu_items(self, info, **kwargs):
        return MenuItem.objects.all()

    @login_required
    def resolve_all_tables(self, info, **kwargs):
        return Table.objects.all()

    @login_required
    def resolve_order_by_id(self, info, id):
        return Order.objects.get(pk=id)


class CreateOrder(graphene.Mutation):
    order = graphene.Field(OrderType)

    class Arguments:
        table_id = graphene.Int()

    @login_required
    def mutate(self, info, table_id):
        table = Table.objects.get(id=table_id)
        order = Order.objects.create(table=table)
        return CreateOrder(order=order)


class AddOrderItem(graphene.Mutation):
    order_item = graphene.Field(OrderItemType)

    class Arguments:
        order_id = graphene.Int()
        menu_item_id = graphene.Int()
        quantity = graphene.Int()

    @login_required
    def mutate(self, info, order_id, menu_item_id, quantity):
        order = Order.objects.get(id=order_id)
        menu_item = MenuItem.objects.get(id=menu_item_id)
        order_item = OrderItem.objects.create(order=order, menu_item=menu_item, quantity=quantity)
        return AddOrderItem(order_item=order_item)


class Mutation(graphene.ObjectType):
    create_order = CreateOrder.Field()
    add_order_item = AddOrderItem.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
