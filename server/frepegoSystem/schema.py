import graphene
from barRestaurant.schema import Query as POSQuery, Mutation as PosMutation
from .middleware import AuthMiddleware
from graphql_jwt.middleware import JSONWebTokenMiddleware
#from users.schema import Query as UserQuery, Mutation as AuthMutation
from booking.schema import Query as BookingQuery, Mutation as BookingMutation

class Query(POSQuery, BookingQuery, graphene.ObjectType):
    pass


class Mutation(PosMutation,BookingMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
