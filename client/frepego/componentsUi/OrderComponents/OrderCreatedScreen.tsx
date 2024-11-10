import React from "react";
import {Text, View, StyleSheet, Modal, TouchableOpacity, ActivityIndicator} from "react-native";
import {Icon} from "react-native-elements";
import {useMutation} from "@apollo/client";
import {UPDATE_ORDER_STATUS} from "@/app/graph_queries";
import s from "@/app/(app)/Tables/MenuItems/styles";

interface NewProps {
    createOrderView: boolean;
    closeCreatedOrder: () => void;
    order: any;
    closeCart?: () => void;
    command: "continue" | "complete the order";
    setOrderCart?: React.Dispatch<React.SetStateAction<any[]>>
}

const OrderCreatedScreen: React.FC<NewProps> = ({
                                                    createOrderView,
                                                    closeCreatedOrder,
                                                    command,
                                                    closeCart,
                                                    order,
                                                    setOrderCart
                                                }) => {
    const [updatePendingOrder, {loading, error, data}] = useMutation(UPDATE_ORDER_STATUS);

    if (!order) return null;

    const handleCompleteOrder = async () => {
        try {
            await updatePendingOrder({
                variables: {
                    orderId: order.id
                }
            });
            if (setOrderCart) {
                setOrderCart(prevCart => prevCart.filter(item => item.id !== order.id));
            }
            closeCreatedOrder();
        } catch (err) {
            console.error("Error completing the order:", err);
        }
    };

    return (
        <Modal visible={createOrderView}>
            <View style={styles.container}>
                {command === "complete the order" && (
                    <TouchableOpacity onPress={closeCreatedOrder} style={{margin: 20}}>
                        <Icon name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                )}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Confirmation</Text>
                </View>

                <View style={styles.iconContainer}>
                    {/* Icon or image can be placed here */}
                </View>

                <Text style={styles.statusText}>Order Created!</Text>
                <Text style={styles.subText}>
                    We’re preparing your order now. You’ll receive a notification soon!
                </Text>

                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Order amount</Text>
                        <Text style={styles.value}>{order.totalCharge}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Order number</Text>
                        <Text style={styles.value}>{order.orderNumber}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View>
                        <Text style={styles.label}>Order details</Text>
                        {order.orderItems.map((item: any, index: number) => (
                            <View style={styles.infoRow} key={index}>
                                <Text style={styles.value}>{item.menuItem.title}</Text>
                                <Text>{item.menuItem.price}</Text>
                                <Text>Quantity: {item.quantity}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.divider} />
                </View>

                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={async () => {
                        if (command === "continue") {
                            if (closeCart) closeCart();
                            closeCreatedOrder();
                        } else if (command === "complete the order") {
                            await handleCompleteOrder();
                        }
                    }}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={s.cartText}>{command}</Text>
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

export default OrderCreatedScreen;
