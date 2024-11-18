import {ActivityIndicator, Text, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import BookingCartModal from "@/componentsUi/BookingPage/BookingCartModal";
import React, {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {PENDING_BOOKINGS} from "@/app/graph_queries";



const BookingCartContainer:React.FC = () => {
    const [openBookingCart, setOpenBookingCart] = useState(false)
    //const [loading, setLoading] = useState(false)
    const [pendingBookings, setPendingBookings] = useState<any[]>([])
    const {data, loading, error} = useQuery(PENDING_BOOKINGS)

    useEffect(() => {
        if (data) {
            setPendingBookings(data.bookingsPendingCheckout);
            // Optional: Add additional side effects here, e.g., notifications
        }
    }, [data]);

    const bookings = []
    const closeBookingCart = () =>{
        setOpenBookingCart(false);
    }


    return(
        <View style={{ flexDirection: "row", alignItems: "center", padding: 5, marginRight: 15 }}>
            <Text style={{ fontSize: 15, fontWeight: "normal", textAlign: 'center', color: "black" }}>waiting checkout</Text>
            {loading ? (
                <ActivityIndicator size="small" color="black" style={{ marginLeft: 10 }} />
            ) : (
                <MaterialCommunityIcons
                    name="cart"
                    size={24}
                    color="black"
                    style={{ marginLeft: 10 }}
                    onPress={() => setOpenBookingCart(true)}
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
                <Text style={{ color: "red", fontSize: 12 }}>{pendingBookings.length}</Text>
            </View>
            <BookingCartModal bookingCart={pendingBookings} closeOrderCart={closeBookingCart} openOrderCart={openBookingCart} setOrderCart={setPendingBookings}/>
        </View>

    )
}

export default BookingCartContainer;