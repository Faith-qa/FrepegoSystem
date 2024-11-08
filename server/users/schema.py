import graphene
import graphql_jwt
from graphql_jwt.decorators import login_required
from graphql_jwt.refresh_token.shortcuts import create_refresh_token
from graphql_jwt.shortcuts import get_token

from .models import CustomUser
from graphene_django.types import DjangoObjectType

class CustomUserType(DjangoObjectType):
    class Meta:
        model = CustomUser

class CreateUser(graphene.Mutation):
    user = graphene.Field(CustomUserType)
    token = graphene.String()
    refresh_token = graphene.String()

    class Arguments:
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        username = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, first_name, last_name, username, email, password):
        user = CustomUser(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name
        )
        user.set_password(password)
        user.save()
        token = get_token(user)
        refresh_token = create_refresh_token(user)
        return CreateUser(user=user, token=token, refresh_token=refresh_token)

class Query(graphene.ObjectType):
    whoami = graphene.Field(CustomUserType)
    users = graphene.List(CustomUserType)

    def resolve_whoami(self, info):
        user = info.context.user
        # Check if user is authenticated
        if user.is_anonymous:
            raise Exception('Authentication failure: you must sign in')
        return user

    @login_required
    def resolve_users(self, info):
        return CustomUser.objects.all()

class Mutation(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    verify_token = graphql_jwt.Verify.Field()
    create_user = CreateUser.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
