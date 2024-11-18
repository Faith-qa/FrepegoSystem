import { useState, useEffect } from "react";
import DashTableScreen from "@/app/(app)/Dash_tables/DashTableScreen";
import { ImageBackground, Text } from "react-native";
import s from "@/app/(app)/Tables/styles";
import { useQuery } from "@apollo/client";
import { ALL_ORDERS } from "@/app/graph_queries";
import { ALL_BOOKINGS } from "@/app/graph_queries";  // Assuming you have this query defined

const DashTableContainer: React.FC = () => {
    // Fetch orders data
    const { data: ordersData, loading: ordersLoading, error: ordersError } = useQuery(ALL_ORDERS);

    // Fetch bookings data
    const { data: bookingsData, loading: bookingsLoading, error: bookingsError } = useQuery(ALL_BOOKINGS);

    const [orders, setOrders] = useState<any[]>([]);
    const [bookings, setBookings] = useState<any[]>([]);

    // Transform orders query data for DashTableScreen
    useEffect(() => {
        if (ordersData) {
            setOrders(
                ordersData.allOrders.map((order: any) => ({
                    id: order.id,
                    orderNumber: order.orderNumber,
                    createdAt: order.createdAt,
                    status: order.status,
                    totalCharge: order.totalCharge,
                    orderItems: order.orderItems.map((item: any) => ({
                        menuItem: item.menuItem.title,
                        quantity: item.quantity,
                    })),
                }))
            );
        }
    }, [ordersData]);

    // Transform bookings query data for DashTableScreen
    useEffect(() => {
        if (bookingsData) {
            setBookings(
                bookingsData.allBookings.map((booking: any) => ({
                    id: booking.id,
                    checkIn: booking.checkIn,
                    checkOut: booking.checkOut,
                    totalCharge: booking.totalCharge,
                    checkoutStatus: booking.checkoutStatus,
                    isCancelled: booking.isCancelled,
                    guests: booking.guests.map((guest: any) => guest.name), // Assuming guest has 'name' field
                }))
            );
        }
    }, [bookingsData]);

    // Check if any query is still loading
    const isLoading = ordersLoading || bookingsLoading;

    const tableNames = ["orders", "bookings"];

    return (
        <ImageBackground
            source={{
                uri: "https://images.unsplash.com/photo-1524947820859-81b71fe05edc?q=80&w=2833&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={s.background}
        >
            {/* Display tables for both orders and bookings */}
            <DashTableScreen items={orders} tableName={tableNames[0]} loading={isLoading} />
            <DashTableScreen items={bookings} tableName={tableNames[1]} loading={isLoading} />
        </ImageBackground>
    );
};

export default DashTableContainer;
