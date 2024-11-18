import React, {useState} from "react";
import {Text, TouchableOpacity, View, StyleSheet, Alert, ActivityIndicator,Modal} from "react-native";
import s from "@/app/(app)/Tables/MenuItems/styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import {Icon} from "react-native-elements";


interface NewProps{
    open: boolean;
    closeModal: ()=> void
}
const csv_modal:React.FC<NewProps> = ({
    open,closeModal
                                      }) => {
    const [openCheckinPicker, setOpenCheckinPicker] = useState(false);
    const [openCheckoutPicker, setOpenCheckoutPicker] = useState(false);
    const [from, setFrom] = useState<Date|null>(null)
    const [to, setTo] = useState<Date|null>(null)
    const[loading, setLoading] = useState(false)

    // handle download csv
    const handleCSVDownload = () => {
        alert("coming soon")
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
    return(<>
        <Modal transparent={true} animationType="slide" visible={open}>
            <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={{margin: 20}} onPress={()=>closeModal()}>
                <Icon name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Confirm Create Booking</Text>
        </View>
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dates</Text>
            <View style={styles.checkinCheckoutCon}>
                <View style={{ alignItems: "center" }}>
                    <Text>Check-in Date</Text>
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
                    <Text>Check-out Date</Text>
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
            style={[styles.buttonContainer,]}
            onPress={handleCSVDownload}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <Text style={s.cartText}>Create Booking</Text>
            )}
        </TouchableOpacity>
            </View>
        </Modal>

    </>)

    //
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        //margin:10
    },
    header: {
        flexDirection: 'row',
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
    },
});
export default csv_modal;