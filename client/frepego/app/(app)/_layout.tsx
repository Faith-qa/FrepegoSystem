import { Redirect, Stack, useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import ProfilePicContainer from "@/componentsUi/ProfilePic";
import { useSession } from "@/app/authContext";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import OrderCartModal from "@/componentsUi/OrderComponents/OrderCartModal";
import {useQuery} from "@apollo/client";
import {PENDING_ORDERS_QUERY} from "@/app/graph_queries";
import BookingCartModal from "@/componentsUi/BookingPage/BookingCartModal";
import BookingCartContainer from "../../componentsUi/BookingPage/BookingCartContainer";
import OrderCartContainer from "@/componentsUi/OrderComponents/OrderCartContainer";


export default function AppLayout() {
    const { session, isLoading } = useSession();
    const [pendingOrders, setPendingOrders] = useState<any[]>([]);
    const [openBookingCart, setOpenBookingCart] = useState(false)
    const { data, error, loading } = useQuery(PENDING_ORDERS_QUERY);




   useEffect(() => {
        if (data) {
            setPendingOrders(data.pendingOrders);
            // Optional: Add additional side effects here, e.g., notifications
        }
    }, [data]);




    // Redirect if no session (user is not logged in)
    if (!session) {
        return <Redirect href={"/sign-in"} />;
    }



    if (isLoading) {
        return <Text>Loading ...</Text>;
    }

    return (
        <GestureHandlerRootView>
            <Drawer
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    drawerActiveTintColor: 'white',
                    drawerInactiveTintColor: 'gray',
                    drawerActiveBackgroundColor: 'rgb(48, 119, 156)',
                    drawerInactiveBackgroundColor: 'transparent',
                }}
            >
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: "Home",
                        title: "Home",
                        drawerLabelStyle: { color: "white" },
                    }}
                />
                <Drawer.Screen
                    name={"Tables"}
                    options={{
                        drawerLabel: "Bar and Restaurant",
                        title: 'New order',
                        drawerLabelStyle: { color: "white" },
                        headerRight: ()=>(
                            <OrderCartContainer/>
                        )
                    }}
                />
                <Drawer.Screen
                    name={"Dash_tables"}
                    options={{
                        drawerLabel: "Tables",
                        title: 'Tables',
                        drawerLabelStyle: { color: "white" }
                    }}
                />
                <Drawer.Screen
                    name={"Bookings"}
                    options={{
                        drawerLabel: "Book a room",
                        title: 'New Booking',
                        drawerLabelStyle: { color: "white" },
                        headerRight: () => (
                            <BookingCartContainer/>
                        ),

                    }}
                />
                <Drawer.Screen
                    name={"Dashboard"}
                    options={{
                        drawerLabel: "Analytics",
                        title: 'Analytics',
                        drawerLabelStyle: { color: "white" }
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}

function CustomDrawerContent(props: any) {
    return (
        <LinearGradient
            colors={['rgb(48, 119, 156)', 'rgb(20, 89, 125)']}
            style={{ flex: 1 }}
        >
            <DrawerContentScrollView
                {...props}
                style={{ padding: 10 }}
            >
                <ProfilePicContainer />
                <Text style={{ color: "white", paddingTop: 20 }}>Welcome James</Text>
                <View
                    style={{
                        borderBottomColor: 'white',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        marginTop: 30,
                        marginBottom: 30
                    }}
                />
                <DrawerItemList {...props} />
                <DrawerItem label="Help" onPress={() => alert('Link to help')} labelStyle={{ color: 'white' }} />
            </DrawerContentScrollView>
        </LinearGradient>
    );
}
