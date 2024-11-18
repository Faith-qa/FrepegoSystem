import { useState, useEffect } from "react";
import DashTableScreen from "@/app/(app)/Dash_tables/DashTableScreen";
import { ImageBackground, Text } from "react-native";
import s from "@/app/(app)/Tables/styles";
import { useQuery } from "@apollo/client";
import { ALL_ORDERS } from "@/app/graph_queries";

const DashTableContainer: React.FC = () => {
    const { data, loading, error } = useQuery(ALL_ORDERS);

    const [orders, setOrders] = useState<any[]>([]);

    // Transform query data for DashTableScreen
    useEffect(() => {
        if (data) {
            setOrders(
                data.allOrders.map((order: any) => ({
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
    }, [data]);

    const tableNames = ["Orders"];

    return (
        <ImageBackground
            source={{
                uri: "https://images.unsplash.com/photo-1524947820859-81b71fe05edc?q=80&w=2833&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={s.background}
        >
            <DashTableScreen items={orders} tableName={tableNames[0]} loading={loading} />
        </ImageBackground>
    );
};

export default DashTableContainer;
