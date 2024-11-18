import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Alert, Modal, Text, TouchableOpacity, View, ActivityIndicator, StyleSheet } from "react-native";
import { GET_DATA_FROM_TABLE } from "@/app/graph_queries";
import { json2csv } from "json-2-csv";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";

interface CsvModalProps {
    startDate: string;
    endDate: string;
    open: boolean;
    closeModal: () => void;
    tableName: string;
    closeHandleDate: () => void;
}

const CsvModal: React.FC<CsvModalProps> = ({ open, startDate, closeModal, endDate, tableName }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { loading, error, data } = useQuery(GET_DATA_FROM_TABLE, {
        variables: { tableName, startDate, endDate },
    });

    const flattenData = (tableName: string, data: any[]): any[] => {
        if (tableName === "orders") {
            return data.map((item: any) => ({
                id: item.id,
                orderNumber: item.orderNumber,
                tableNumber: item.table?.number,
                status: item.status,
                totalCharge: item.totalCharge,
                orderItems: item.orderItems
                    ?.map(
                        (orderItem: any) =>
                            `${orderItem.menuItem.title} (x${orderItem.quantity} @ ${orderItem.menuItem.price})`
                    )
                    .join("; "),
            }));
        }
        // Default: return raw data or custom logic for other tables
        return data;
    };

    const handleDownload = async () => {
        try {
            setIsLoading(true);

            if (!data?.dataFromTable || data.dataFromTable.length === 0) {
                Alert.alert("No Data", "No data available for download.");
                return;
            }

            const parsedData = data.dataFromTable.map((item: string) => JSON.parse(item));
            const flattenedData = flattenData(tableName, parsedData);

            console.log("Flattened Data:", flattenedData);

            const csvData = await json2csv(flattenedData);
            console.log("Converted CSV Data:", csvData);

            const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (!permissions.granted) {
                Alert.alert("Permission Denied", "Storage access permission is required to save the CSV file.");
                return;
            }

            const fileName = `data_${new Date().toISOString().slice(0, 10)}_${Math.random().toString(36).substr(2, 9)}.csv`;
            const fileUri = await StorageAccessFramework.createFileAsync(
                permissions.directoryUri,
                fileName,
                "application/csv"
            );

            await FileSystem.writeAsStringAsync(fileUri, csvData, {
                encoding: FileSystem.EncodingType.UTF8,
            });

            console.log("CSV file saved:", fileUri);
            Alert.alert("CSV", "Download successful!");
        } catch (error: any) {
            console.error("Error saving CSV:", error);
            Alert.alert("Error", error.message || "Failed to save the file.");
        } finally {
            setIsLoading(false);
            closeModal();
        }
    };

    return (
        <Modal visible={open} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {loading || isLoading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#0000ff" />
                            <Text style={styles.message}>Processing Data...</Text>
                        </View>
                    ) : error ? (
                        <Text style={styles.error}>Error Retrieving Data: {error.message}</Text>
                    ) : (
                        <>
                            <Text style={styles.message}>
                                Data is available. Click "Download" to save as CSV.
                            </Text>
                            <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
                                <Text style={styles.downloadButtonText}>Download</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default CsvModal;

// Styles
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    loadingContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    message: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
        marginVertical: 10,
    },
    error: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
        marginVertical: 10,
    },
    downloadButton: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
        marginTop: 15,
        width: "80%",
        alignItems: "center",
    },
    downloadButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    closeButton: {
        backgroundColor: "#d9534f",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: "80%",
        alignItems: "center",
    },
    closeButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
