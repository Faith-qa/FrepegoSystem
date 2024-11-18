import React, {useState} from "react";
import { Text, TouchableOpacity, View } from "react-native";
import s from "@/app/(app)/Tables/MenuItems/styles"; // Adjust this path if necessary
import { OrderItem } from "@/app/(app)/Tables/MenuItems/menuItemContainer";
import OrderCreatedScreen from "@/componentsUi/OrderComponents/OrderCreatedScreen";
import BookingCreatedScreen from "@/componentsUi/BookingPage/BookingCreatedScreen"; // Ensure this is correct

interface NewProp {
    orderItem: any; // Ensure the prop type matches the OrderItem structure
}

const BookingItemCont: React.FC<NewProp> = ({ orderItem }) => {
    const [orderView, setOrderView] = useState(false)

    const closeOrderView = () => {
        setOrderView(false)
    }

    return (
        <View>
            <TouchableOpacity style={s.itemContainer} onPress={()=>setOrderView(true)}>
                <View style={s.itemContent}>
                    <Text style={s.itemTitle}>Room Number {orderItem.room.roomNumber}</Text>
                    <Text style={s.itemPrice}>Ksh {orderItem.totalCharge}</Text>
                    <Text style={s.itemDescription}>checkout {orderItem.checkOut}</Text>

                    {/* Map over the orderItems and display details */}
                    {orderItem.guests.map((item:any, index:any) => (
                        <View key={index}>
                            <Text style={s.itemTitle}>booked by - Qty: {item.name}</Text>
                            <Text style={s.itemPrice}>id Number:  {item.id_number}</Text>
                        </View>
                    ))}
                </View>
            </TouchableOpacity>
            <BookingCreatedScreen createOrderView={orderView} closeCreatedOrder={closeOrderView} booking={orderItem}/>
</View>
    );
};

export default BookingItemCont;
