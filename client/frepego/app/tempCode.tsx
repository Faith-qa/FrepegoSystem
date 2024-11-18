import React, { useEffect, useState } from "react";
import { DataTable } from "react-native-paper";
import { View, Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import s from "../app/(app)/Dash_tables/styles";

interface DashTableScreenProps {
    items: any[];
    tableName: string;
}

const DashTableScreen: React.FC<DashTableScreenProps> = ({ items, tableName }) => {
    const [page, setPage] = useState<number>(0);
    const [numberOfItemsPerPageList] = useState([5, 10, 15]);
    const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    // Helper function to flatten nested objects
// Helper function to flatten nested objects
    // Helper function to flatten nested objects
    const flattenObject = (
        obj: Record<string, any>,
        prefix = ""
    ): Record<string, any> => {
        return Object.keys(obj).reduce((acc: Record<string, any>, key: string) => {
            const value = obj[key];
            const newKey = prefix ? `${prefix}.${key}` : key;

            if (typeof value === "object" && value !== null && !Array.isArray(value)) {
                Object.assign(acc, flattenObject(value, newKey));
            } else {
                acc[newKey] = value;
            }

            return acc;
        }, {}); // Initialize `acc` as an empty object
    };


    // Extract unique headers dynamically
    const headers = items.length > 0 ? Object.keys(flattenObject(items[0])) : [];

    const flattenedItems = items.map((item) => flattenObject(item));

    return (
        <View style={s.container}>
            <LinearGradient colors={["#1976D2", "#42A5F5"]} style={s.header}>
                <Text style={s.headerText}>{tableName}</Text>
            </LinearGradient>
            <ScrollView horizontal>
                <DataTable style={s.card}>
                    {items.length === 0 ? (
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ margin: 3, fontSize: 12 }}>No data available</Text>
                        </View>
                    ) : (
                        <>
                            {/* Dynamically render headers */}
                            <DataTable.Header>
                                {headers.map((header, index) => (
                                    <DataTable.Title key={index}>
                                        {header.charAt(0).toUpperCase() + header.slice(1)}
                                    </DataTable.Title>
                                ))}
                            </DataTable.Header>

                            {/* Dynamically render rows */}
                            {flattenedItems.slice(from, to).map((item: any, rowIndex: number) => (
                                <DataTable.Row key={rowIndex}>
                                    {headers.map((header, colIndex) => (
                                        <DataTable.Cell key={colIndex}>
                                            {item[header]?.toString() || "—"}
                                        </DataTable.Cell>
                                    ))}
                                </DataTable.Row>
                            ))}

                            {/* Pagination */}
                            <DataTable.Pagination
                                page={page}
                                numberOfPages={Math.ceil(items.length / itemsPerPage)}
                                onPageChange={setPage}
                                label={`${from + 1}-${to} of ${items.length}`}
                                numberOfItemsPerPageList={numberOfItemsPerPageList}
                                numberOfItemsPerPage={itemsPerPage}
                                onItemsPerPageChange={onItemsPerPageChange}
                                showFastPaginationControls
                                selectPageDropdownLabel={"Rows per page"}
                            />
                        </>
                    )}
                </DataTable>
            </ScrollView>
        </View>
    );
};

//export default DashTableScreen;
