
class AuthMiddleware:
    def resolve(self, next, root, info, **args):
        print("middleware at work")
        user = info.context.user
        if user.is_authenticated:
            return next(root, info, **args)
        else:
            raise Exception("Authentication required")