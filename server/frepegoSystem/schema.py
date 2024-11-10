import graphene
from barRestaurant.schema import Query as POSQuery, Mutation as PosMutation
from .middleware import AuthMiddleware
from graphql_jwt.middleware import JSONWebTokenMiddleware
from users.schema import Query as UserQuery, Mutation as AuthMutation

class Query(POSQuery, UserQuery, graphene.ObjectType):
    pass


class Mutation(PosMutation , AuthMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
