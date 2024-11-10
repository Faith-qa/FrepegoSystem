import React, {useState} from "react";
import { Text, TouchableOpacity, View } from "react-native";
import s from "@/app/(app)/Tables/MenuItems/styles"; // Adjust this path if necessary
import { OrderItem } from "@/app/(app)/Tables/MenuItems/menuItemContainer";
import OrderCreatedScreen from "@/componentsUi/OrderComponents/OrderCreatedScreen"; // Ensure this is correct

interface NewProp {
    orderItem: any; // Ensure the prop type matches the OrderItem structure
}

const OrderItemCont: React.FC<NewProp> = ({ orderItem }) => {
    const [orderView, setOrderView] = useState(false)

    const closeOrderView = () => {
        setOrderView(false)
    }

    return (
        <View>
        <TouchableOpacity style={s.itemContainer} onPress={()=>setOrderView(true)}>
            <View style={s.itemContent}>
                <Text style={s.itemTitle}>Order Number {orderItem.orderNumber}</Text>
                <Text style={s.itemPrice}>Ksh {orderItem.totalCharge}</Text>
                <Text style={s.itemDescription}>For Table Number {orderItem.table.number}</Text>

                {/* Map over the orderItems and display details */}
                {orderItem.orderItems.map((item:any, index:any) => (
                    <View key={index}>
                        <Text style={s.itemTitle}>{item.menuItem.title} - Qty: {item.quantity}</Text>
                        <Text style={s.itemPrice}>Price: Ksh {item.menuItem.price}</Text>
                    </View>
                ))}
            </View>
        </TouchableOpacity>
    <OrderCreatedScreen
        createOrderView={orderView}
        closeCreatedOrder={closeOrderView}
        command={"complete the order"}
        order={orderItem}
    /></View>
    );
};

export default OrderItemCont;
