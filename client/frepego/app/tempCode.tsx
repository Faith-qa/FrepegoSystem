import React, {useState} from "react";
import { useQuery } from "@apollo/client";
import { Alert, Modal, Text, TouchableOpacity, View, ActivityIndicator, StyleSheet } from "react-native";
import {GET_DATA_FROM_TABLE} from "@/app/graph_queries";
import {json2csv} from "json-2-csv";
import * as FileSystem from "expo-file-system";

interface NewProps {
    startDate: string;
    endDate: string;
    open: boolean;
    closeModal: () => void;
    tableName: string;
    closeHandleDate: ()=> void;
}

const CsvModal: React.FC<NewProps> = ({ open, startDate, closeModal, endDate, tableName }) => {
    const[isLoading, setIsLoading] = useState(false)
    const { loading, error, data } = useQuery(GET_DATA_FROM_TABLE, {
        variables: { tableName, startDate, endDate },
    });

    const handleDownload = async() => {
        try{

            const csvData = json2csv(data.dataFromTable)
            const fileUri = FileSystem.documentDirectory+'data.csv'
            await FileSystem.writeAsStringAsync(fileUri, csvData, {
                encoding: FileSystem.EncodingType.UTF8
            })
            console.log("csv file saved")
            Alert.alert("CSV", "dowload successful")
            closeModal()

        }catch(error:any){
            console.error('Error saving CSV:', error);
            Alert.alert('Error', error.message);
        }

    };

    return (
        <Modal visible={open} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {loading && (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#0000ff" />
                            <Text style={styles.message}>Retrieving Data...</Text>
                        </View>
                    )}
                    {error && <Text style={styles.error}>Error Retrieving Data: {error.message}</Text>}
                    {data && (
                        <Text style={styles.message}>
                            Data is available. Click "Download" to initiate download.
                        </Text>
                    )}

                    {!error && <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
                        <Text style={styles.downloadButtonText}>Download</Text>
                    </TouchableOpacity>}
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

//export default CsvModal;

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
