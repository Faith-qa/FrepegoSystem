import s from "@/app/(app)/Tables/MenuItems/styles";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import React from "react";
import {OrderItem} from "@/app/(app)/Tables/MenuItems/menuItemContainer";

interface NewProp{
    orderItem: OrderItem
}
const OrderItemCont:React.FC <NewProp>=({orderItem}) => {
    return(
        <TouchableOpacity style={s.itemContainer}>
            <View style={s.itemContent}>
                <Text style={s.itemTitle}>Order Number {orderItem.order_number}</Text>
                <Text style={s.itemPrice}>Ksh {orderItem.Total_Charge}</Text>
                <Text style={s.itemDescription}>For Table Number {orderItem.table_number}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default OrderItemCont;