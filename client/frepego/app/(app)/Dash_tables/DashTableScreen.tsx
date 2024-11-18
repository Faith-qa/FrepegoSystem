import React, { useEffect, useState } from "react";
import { Card, Icon } from "react-native-elements";
import { DataTable } from "react-native-paper";
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import s from "./styles";
import Csv_modal from "@/app/(app)/Dash_tables/csv_modal";
import HandleDateModal from "@/app/(app)/Dash_tables/HandleDateModal";

interface NewProps {
    items: any[];
    tableName: string;
    loading: boolean;
}

const DashTableScreen: React.FC<NewProps> = ({ items, tableName,loading }) => {
    const [page, setPage] = useState<number>(0);
    const [numberOfItemsPerPageList] = useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
    const [opencsv, setOpencsv] = useState(false)

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    //close csv modal
    const closecsv = () =>{
        setOpencsv(false)
    }

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

    const flattenedItems = items.map((item) => flattenObject(item));
    const headers = flattenedItems.length > 0 ? Object.keys(flattenedItems[0]) : [];

    return (
        <View style={s.container}>
            {/* Table Header */}
            <LinearGradient colors={["#1976D2", "#42A5F5"]} style={s.header}>
                <Text style={s.headerText}>{tableName}</Text>
                <TouchableOpacity onPress={() => setOpencsv(true)}>
                    <Icon name={"add"} size={24} color={"white"} />
                </TouchableOpacity>
                <HandleDateModal open={opencsv} close={closecsv} tableName={tableName}/>
            </LinearGradient>

            {/* Table Content */}
            <ScrollView horizontal>
                <DataTable style={s.card}>
                    {loading ? (
                        <View style={{ alignItems: "center" }}>
                            <ActivityIndicator size={"large"} color={"gray"}/>
                        </View>
                    ) : (
                        <>
                            {/* Table Headers */}
                            <DataTable.Header>
                                {headers.map((header) => (
                                    <DataTable.Title key={header}>{header}</DataTable.Title>
                                ))}
                            </DataTable.Header>

                            {/* Table Rows */}
                            {flattenedItems.slice(from, to).map((item, index) => (
                                <DataTable.Row key={index}>
                                    {headers.map((header) => (
                                        <DataTable.Cell key={header}>
                                            {item[header]?.toString() ?? ""}
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

export default DashTableScreen;
