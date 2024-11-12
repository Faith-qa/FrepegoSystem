from django.db import models
from django.db.models import Max


class MenuItem(models.Model):
    title = models.CharField(max_length=255, unique=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.TextField()
    category = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class Table(models.Model):
    number = models.IntegerField(unique=True, default=1)
    capacity = models.IntegerField(default=4)

    def __str__(self):
        return f"Table {self.number}"


class Order(models.Model):
    STATUS_CHOICES = (("pending", "Pending"), ("completed", "Completed"))
    order_number = models.IntegerField(unique=True,editable=False)
    table = models.ForeignKey(Table, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default='pending', choices=STATUS_CHOICES)  # e.g., 'pending', 'completed'
    total_charge = models.DecimalField(max_digits=10, decimal_places=2)

    def save(self, *args, **kwargs):
        # Automatically generate order_number if it is not set
        if not self.order_number:
            last_order = Order.objects.all().aggregate(Max('order_number'))
            max_order_number = last_order.get('order_number__max', 0)
            self.order_number = max_order_number + 1

        super(Order, self).save(*args, **kwargs)
    def __str__(self):
        return f"Order {self.order_number} - Table {self.table.number}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='order_items', on_delete=models.CASCADE)
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.quantity} x {self.menu_item.title}"
