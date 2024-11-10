import React from "react";
import { Text, View, StyleSheet, Modal, TouchableOpacity } from "react-native";

interface NewProps {
    createOrderView: boolean;
    closeCreatedOrder: () => void;
    order: any;
    closeCart?: () => void;
    command: "continue" | "complete the order";
}

const OrderCreatedScreen: React.FC<NewProps> = ({
                                                    createOrderView,
                                                    closeCreatedOrder,
                                                    command,
                                                    closeCart,
                                                    order,
                                                }) => {
    if (!order) return null;

    return (
        <Modal visible={createOrderView}>
            <View style={styles.container}>
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
                    onPress={() => {
                        if (command === "continue") {
                            if (closeCart) {
                                closeCart();
                            }
                            closeCreatedOrder();
                        } else if (command == "complete the order") {
                            alert("Completing the order");
                        }
                    }}
                >
                    <Text style={styles.buttonText}>{command}</Text>
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
