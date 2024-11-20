import {ActivityIndicator, Alert, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import s from "@/app/(app)/Tables/MenuItems/styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, {useState} from "react";
import {Icon} from "react-native-elements";
import Csv_modal from "@/app/(app)/Dash_tables/csv_modal";

interface NewProps{
    open: boolean;
    close:()=>void;
    tableName:string
}
const HandleDateModal:React.FC<NewProps> = ({
    open, close, tableName
                                  }) =>{
    const [from, setFrom] = useState<Date | null>(null)
    const [to, setTo] = useState<Date|null>(null)
    const [openCheckinPicker, setOpenCheckinPicker] = useState(false);
    const [openCheckoutPicker, setOpenCheckoutPicker] = useState(false);
    const [openCsvHandler, setOpenCsvHandler] = useState(false);

    const formatDate = (date:any) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Add leading zero if month is single digit
        const day = String(d.getDate()).padStart(2, '0'); // Add leading zero if day is single digit

        return `${year}-${month}-${day}`;
    };
    const closeCsvHandler = ()=>{
        setOpenCsvHandler(false)
    }
    const handleCheckinDateChange = (event: any, selectedDate?: Date) => {
        setOpenCheckinPicker(false);
        if (selectedDate) {
            setFrom(selectedDate);
        }
    };

    const handleCheckoutDateChange = (event: any, selectedDate?: Date) => {
        setOpenCheckoutPicker(false);
        if (selectedDate) {
            if (from && selectedDate <= from) {
                Alert.alert("Invalid date", "Checkout date cannot be before or the same as check-in date.");
                return 0;
            }
            setTo(selectedDate);
        }
    };
    return(
        <Modal transparent={true} animationType="slide" visible={open}>
            <View style={styles.modalContainer}>
                <View style={styles.header}>
                    <TouchableOpacity style={{ margin: 20 }} onPress={()=>close()}>
                        <Icon name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Define required data dates</Text>
                </View>

                <View style={styles.section}>
                <Text style={styles.sectionTitle}>Provide Date Range</Text>
                <View style={styles.checkinCheckoutCon}>
                    <View style={{ alignItems: "center" }}>
                        <Text>Start Date</Text>
                        <TouchableOpacity onPress={() => setOpenCheckinPicker(true)} style={styles.selectDateCont}>
                            <Text style={s.quantityText}>
                                {from ? from.toLocaleDateString() : "Select a date"}
                            </Text>
                        </TouchableOpacity>
                        {openCheckinPicker && (
                            <DateTimePicker
                                value={from || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleCheckinDateChange}
                            />
                        )}

                    </View>

                    <View style={{ alignItems: "center" }}>
                        <Text>End Date</Text>
                        <TouchableOpacity onPress={() => setOpenCheckoutPicker(true)} style={styles.selectDateCont}>
                            <Text style={s.quantityText}>
                                {to ? to.toLocaleDateString() : "Select a date"}
                            </Text>
                        </TouchableOpacity>
                        {openCheckoutPicker && (
                            <DateTimePicker
                                value={to || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleCheckoutDateChange}
                            />
                        )}
                    </View>
                </View>

                </View>
                <TouchableOpacity
                    style={[styles.buttonContainer]}
                    onPress={()=>{
                        if(from === null || to === null){
                            Alert.alert("Error", "Dates required")

                        }else{setOpenCsvHandler(true)}
                    }}
                >
                    <Text style={s.cartText}>Initiate csv Download</Text>
                </TouchableOpacity>
                <Csv_modal startDate={formatDate(from)} endDate={formatDate(to)} open={openCsvHandler} closeModal={closeCsvHandler} tableName={tableName} />

                {/* Display a loading message or error message
                        {loading && <Text style={styles.loadingText}>Fetching data, please wait...</Text>}
                        {error && <Text style={styles.errorText}>Error fetching data, please try again.</Text>}*/}
            </View>
        </Modal>


    )
}

const styles= StyleSheet.create({
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
    },
    errorText: {
        marginTop: 10,
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        //margin:10
    },
    header: {
        //flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    backButton: {
        marginRight: 10,
    },
    backArrow: {
        fontSize: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    propertyInfo: {
        flexDirection: 'row',
        padding: 15,
    },
    propertyImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
    },
    propertyText: {
        marginLeft: 10,
        flex: 1,
    },
    propertyTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    propertySubtitle: {
        fontSize: 14,
        color: '#555',
        marginVertical: 2,
    },
    section: {
        margin: 5,
        //marginBottom: 16,
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        alignSelf: "center"
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },
    label: {
        fontSize: 14,
        color: '#555',
    },
    value: {
        fontSize: 14,
        fontWeight: '600',
    },
    editButton: {
        fontSize: 14,
        color: '#007bff',
    },
    totalLabel: {
        fontWeight: '700',
    },
    totalValue: {
        fontWeight: '700',
        fontSize: 16,
    },
    moreInfo: {
        fontSize: 14,
        color: '#007bff',
        textAlign: 'right',
        marginTop: 5,
    },
    checkinCheckoutCon: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    selectDateCont: {
        borderRadius: 10,
        margin: 5,
        padding: 10,
        backgroundColor: "#007bff",
    },
    buttonContainer: {
        //position: "absolute",
        zIndex: 15,
        backgroundColor: "#007bff",
        borderRadius: 8,
        paddingVertical: 12,
        marginTop: 24,
        alignItems: "center",
        width: 180,
        alignSelf:"center"
    },
});

export default HandleDateModal;