import {ActivityIndicator, Text, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import OrderCartModal from "@/componentsUi/OrderComponents/OrderCartModal";
import React, {useState} from "react";
import {useCart} from "@/app/CartContext";

const OrderCartContainer:React.FC = () => {
    const [openOrderCart, setOpenOrderCart] = useState(false);
    const {orderCart, ordersLoading} = useCart()
    const closeOrderCart = () => {
        setOpenOrderCart(false);
    };

    return(
    <View style={{ flexDirection: "row", alignItems: "center", padding: 5, marginRight: 15 }}>
        <Text style={{ fontSize: 20, fontWeight: "normal", textAlign: 'center', color: "black" }}>Pending Orders</Text>
        {ordersLoading ? (
            <ActivityIndicator size="small" color="black" style={{ marginLeft: 10 }} />
        ) : (
            <MaterialCommunityIcons
                name="cart"
                size={24}
                color="black"
                style={{ marginLeft: 10 }}
                onPress={() => setOpenOrderCart(true)}
            />
        )}
        <View
            style={{
                position: "absolute",
                right: -5,
                top: -5,
                borderRadius: 10,
                width: 18,
                height: 18,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text style={{ color: "red", fontSize: 12 }}>{orderCart.length}</Text>
        </View>
        <OrderCartModal
            orderCart={orderCart}
            closeOrderCart={closeOrderCart}
            openOrderCart={openOrderCart}
        />
    </View>
)
}
export default OrderCartContainer;