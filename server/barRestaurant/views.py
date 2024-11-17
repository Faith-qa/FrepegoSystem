import json
import decimal
from django.http import StreamingHttpResponse
from .models import Order, OrderItem

class DecimalJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            return float(obj)  # Convert Decimal to float
        return super().default(obj)

def serialize_orders(orders):
    """
    Converts queryset of orders to a JSON-serializable list matching the GraphQL query structure.
    """
    serialized_orders = []
    for order in orders:
        serialized_orders.append({
            "id": order.id,
            "orderNumber": order.order_number,
            "table": {
                "number": order.table.number,  # Assuming the Table model has a 'number' field
            },
            "status": order.status,
            "totalCharge": order.total_charge,
            "orderItems": [
                {
                    "menuItem": {
                        "title": order_item.menu_item.title,  # Assuming MenuItem has a 'title' field
                        "price": order_item.menu_item.price,
                    },
                    "quantity": order_item.quantity,
                }
                for order_item in order.order_items.all()  # Use the correct related_name here
            ],
        })
    return serialized_orders

def order_updates_stream(request):
    def stream():
        initial_orders = serialize_orders(Order.objects.filter(status="pending"))
        yield f"data: {json.dumps(initial_orders, cls=DecimalJSONEncoder)}\n\n"  # Use custom encoder
        while True:
            updated_orders = serialize_orders(Order.objects.filter(status="pending"))
            yield f"data: {json.dumps(updated_orders, cls=DecimalJSONEncoder)}\n\n"  # Use custom encoder
    return StreamingHttpResponse(stream(), content_type="text/event-stream")
