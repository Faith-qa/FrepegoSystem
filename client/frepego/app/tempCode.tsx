import React, { useEffect, useState, useMemo } from "react";
import { Card, Icon } from "react-native-elements";
import { DataTable } from "react-native-paper";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import s from "../app/(app)/Dash_tables/styles";
import Csv_modal from "@/app/(app)/Dash_tables/csv_modal";
import HandleDateModal from "@/app/(app)/Dash_tables/HandleDateModal";

interface NewProps {
    items: any[];
    tableName: string;
    loading: boolean;
}

const DashTableScreen: React.FC<NewProps> = ({ items = [], tableName, loading }) => {
    const [page, setPage] = useState<number>(0);
    const [numberOfItemsPerPageList] = useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        Math.min(numberOfItemsPerPageList[0], items.length || 1)
    );
    const [opencsv, setOpencsv] = useState(false);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    // Close CSV Modal
    const closecsv = () => {
        setOpencsv(false);
    };

    // Calculate indices for pagination
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    // Flatten object for dynamic table generation
    const flattenObject = (
        obj: Record<string, any>,
        prefix = ""
    ): Record<string, any> => {
        return Object.keys(obj).reduce((acc, key) => {
            const value = obj[key];
            const newKey = prefix ? `${prefix}.${key}` : key;
            if (typeof value === "object" && value !== null) {
                Object.assign(acc, flattenObject(value, newKey));
            } else {
                acc[newKey] = value;
            }
            return acc;
        }, {} as Record<string, any>);
    };

    // Memoized flattened items and headers
    const flattenedItems = useMemo(
        () => items.map((item) => flattenObject(item)),
        [items]
    );
    const headers = useMemo(
        () => (flattenedItems.length > 0 ? Object.keys(flattenedItems[0]) : []),
        [flattenedItems]
    );

    // Handle page change
    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < Math.ceil(items.length / itemsPerPage)) {
            setPage(newPage);
        }
    };

    // Handle items per page change
    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        onItemsPerPageChange(newItemsPerPage);
    };

    return (
        <View style={s.container}>
            {/* Table Header */}
            <LinearGradient colors={["#1976D2", "#42A5F5"]} style={s.header}>
                <Text style={s.headerText}>{tableName}</Text>
                <TouchableOpacity onPress={() => setOpencsv(true)}>
                    <Icon name={"add"} size={24} color={"white"} />
                </TouchableOpacity>
                <HandleDateModal open={opencsv} close={closecsv} tableName={tableName} />
            </LinearGradient>

            {/* Table Content */}
            <ScrollView horizontal>
                <DataTable style={s.card}>
                    {loading ? (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <ActivityIndicator size={"large"} color={"gray"} />
                        </View>
                    ) : (
                        <>
                            {/* Table Headers */}
                            <DataTable.Header>
                                {headers.map((header) => (
                                    <DataTable.Title key={header} textStyle={{color:"#928E85"}}>{header}</DataTable.Title>
                                ))}
                            </DataTable.Header>

                            {/* Table Rows */}
                            {flattenedItems.slice(from, to).map((item, index) => (
                                <DataTable.Row key={index}>
                                    {headers.map((header) => (
                                        <DataTable.Cell key={header} textStyle={{color:"#36454F"}}>
                                            {item[header]?.toString() ?? ""}
                                        </DataTable.Cell>
                                    ))}
                                </DataTable.Row>
                            ))}

                            {/* Pagination */}
                            <DataTable.Pagination
                                page={page}
                                numberOfPages={Math.ceil(items.length / itemsPerPage)}
                                onPageChange={handlePageChange}
                                label={`${from + 1}-${to} of ${items.length}`}
                                numberOfItemsPerPageList={numberOfItemsPerPageList}
                                numberOfItemsPerPage={itemsPerPage}
                                onItemsPerPageChange={handleItemsPerPageChange}
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

const styles = StyleSheet.create({
    newOrderButton: {
        padding: 10,
        height: 60,
        width: 190,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
});

//export default DashTableScreen;
