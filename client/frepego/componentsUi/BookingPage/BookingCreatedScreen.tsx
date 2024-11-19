import React from "react";
import {Text, View, StyleSheet, Modal, TouchableOpacity, ActivityIndicator} from "react-native";
import {Icon} from "react-native-elements";
import {useMutation} from "@apollo/client";
import {CHECKOUT_BOOKING, UPDATE_ORDER_STATUS} from "@/app/graph_queries";
import s from "@/app/(app)/Tables/MenuItems/styles";
import {useCart} from "@/app/CartContext";

interface NewProps {
    createOrderView: boolean;
    closeCreatedOrder: () => void;
    booking: any;
    //closeCart?: () => void;
    //command: "continue" | "complete the order";
    //setOrderCart?: React.Dispatch<React.SetStateAction<any[]>>
}

const BookingCreatedScreen: React.FC<NewProps> = ({
                                                    createOrderView,
                                                    closeCreatedOrder,
                                                    booking,
                                                }) => {
    const [bookingCheckout, {loading, error, data}] = useMutation(CHECKOUT_BOOKING);
    const {removeFromBookingCart} = useCart()
    if (!booking) return null;

    const handleCompleteOrder = async () => {
        console.log(booking.id)
        try {
            const {data} =await bookingCheckout({
                variables:{
                    bookingId: booking.id
                }
            })

                removeFromBookingCart(booking.id)
                closeCreatedOrder();
        } catch (err) {
            console.error("Error completing the order:", err);
        }
    };

    return (
        <Modal visible={createOrderView}>
            <View style={styles.container}>
                    <TouchableOpacity onPress={closeCreatedOrder} style={{margin: 20}}>
                        <Icon name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>

                <View style={styles.header}>
                    <Text style={styles.headerText}>Complete checkout</Text>
                </View>

                <View style={styles.iconContainer}>
                    {/* Icon or image can be placed here */}
                </View>

                <Text style={styles.statusText}>Welcome to checkout</Text>
                <Text style={styles.subText}>
                    I hope you had a lovely stay
                </Text>

                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Booking id</Text>
                        <Text style={styles.value}>{booking.id}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Room</Text>
                        <Text style={styles.value}>{booking.room.room_number}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Amount paid</Text>
                        <Text style={styles.value}>{booking.total_charge}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Checkout Status</Text>
                        <Text style={styles.value}>{booking.checkput_status}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Checkout date</Text>
                        <Text style={styles.value}>{booking.check_out}</Text>
                    </View>
                    {/*<View>
                        <Text style={styles.label}>Order details</Text>
                        {order.orderItems.map((item: any, index: number) => (
                            <View style={styles.infoRow} key={index}>
                                <Text style={styles.value}>{item.menuItem.title}</Text>
                                <Text>{item.menuItem.price}</Text>
                                <Text>Quantity: {item.quantity}</Text>
                            </View>
                        ))}
                    </View>*/}
                    <View style={styles.divider} />
                </View>

                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={async () => {
                        await handleCompleteOrder()
                    }}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={s.cartText}>Complete checkout</Text>
                    )}
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F8FA",
        padding: 20,
    },
    header: {
        marginTop: 20,
        alignItems: "center",
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    iconContainer: {
        alignItems: "center",
        marginVertical: 24,
    },
    statusText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "#333",
    },
    subText: {
        textAlign: "center",
        color: "#666",
        marginVertical: 8,
    },
    infoContainer: {
        backgroundColor: "#FFF",
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
    },
    label: {
        fontSize: 16,
        color: "#333",
    },
    value: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    divider: {
        borderBottomColor: "#E0E0E0",
        borderBottomWidth: 1,
    },
    buttonContainer: {
        backgroundColor: "#007bff",
        borderRadius: 8,
        paddingVertical: 12,
        marginTop: 24,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default BookingCreatedScreen;