import React from "react";
import {Text, View, StyleSheet, Modal, TouchableOpacity} from "react-native";
import {OrderItem} from "@/app/(app)/Tables/MenuItems/menuItemContainer";


interface NewProps{
    createOrderView: boolean;
    closeCreatedOrder: ()=>void;
    order: OrderItem;
    closeCart?: ()=> void;
    command: "continue" | "complete the order";
}
const OrderCreatedScreen: React.FC<NewProps> = ({createOrderView,
                                                    closeCreatedOrder, command, closeCart}) => {
    // Sample data
    const orders = {
        OrderAmount: "KES 1334.00",
        OrderNumber: "404020000656827",
        OrderItems: [
            {
                id: '1',
                title: 'Full American Breakfast',
                price: 650.00,
                description: 'Freshly squeezed juice, fruits cuts, toast served with butter and jam, breakfast cereals...',
                image: 'https://images.pexels.com/photos/103124/pexels-photo-103124.jpeg?auto=compress&cs=tinysrgb&w=1200', // Replace with actual image path or URL
            },
            {
                id: '2',
                title: 'Light Breakfast',
                price: 520.00,
                description: 'Freshly squeezed juice or fruit cuts, toast served with butter and jam and two eggs...',
                image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Replace with actual image path or URL
            },
        ],
    };

    // TODO function to handle order creation and pushing to Ordercart
    // TODO function to handle

    return (
        <Modal
            visible={createOrderView}
        >
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
                        <Text style={styles.value}>{orders.OrderAmount}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Order number</Text>
                        <Text style={styles.value}>{orders.OrderNumber}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View>
                        <Text style={styles.label}>Order details</Text>
                        {orders.OrderItems.map((item)=>(
                            <View style={styles.infoRow} key={item.id}>
                                <Text style={styles.value}>{item.title}</Text>
                                <Text>{item.price}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.divider} />
                </View>

                <TouchableOpacity style={styles.buttonContainer}
                                  onPress={()=>{
                                      if (command === "continue"){
                                          alert("continue shoping")
                                          closeCreatedOrder()
                                      } else if (command == "complete the order"){
                                          alert("completing the order")
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
