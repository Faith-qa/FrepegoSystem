import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
    Modal
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import s from "@/app/(app)/Tables/MenuItems/styles";
import {Icon} from "react-native-elements";
import GuestDetailsModal from "@/componentsUi/BookingPage/GuestDetailsModal";
import {useMutation} from "@apollo/client";
import {CREATE_BOOKING_MUTATION} from "@/app/graph_queries";

interface NewProps {
    roomDetails?: any,
    boookingDetails?:any,
    openBookingForm: boolean;
    closeBookingForm: ()=>void;
    setBookingCart?:React.Dispatch<React.SetStateAction<any[]>>
}

const BookingForm: React.FC<NewProps> = ({openBookingForm, closeBookingForm, roomDetails, setBookingCart}) => {
    const [checkin, setCheckin] = useState<Date | null>(null);
    const [checkout, setCheckout] = useState<Date | null>(null);
    const [openCheckinPicker, setOpenCheckinPicker] = useState(false);
    const [openCheckoutPicker, setOpenCheckoutPicker] = useState(false);
    const [openGuestInfo, setOpenGuestInfo] = useState(false);
    const [guestids, setGuestids] = useState<any[]>([])
    const [createBooking, {loading, error, data}] = useMutation(CREATE_BOOKING_MUTATION)
    const image = "https://images.unsplash.com/photo-1445991842772-097fea258e7b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const closeGuestInfo = ()=>{
        setOpenGuestInfo(false)
    }

    const handleCreateBooking = async() => {
        try{
        if (guestids.length == 0 || guestids.length > 2){
            throw Error("guest info needed")
        }
        if (checkin ===  null || checkout === null){
            throw Error("provide checkin and checkout dates")
        }
        const flatIds = guestids.flatMap(Object.values)
        await createBooking({
            variables: {
                guestIds: flatIds,
                roomId: roomDetails.id,
                checkIn: checkin.toISOString().slice(0, 19),
                checkOut: checkout.toISOString().slice(0, 19),
            }
        })
            if(setBookingCart){
                setBookingCart(prevCart=>prevCart.filter(item=> item.id !== roomDetails.id))
                closeBookingForm()
            }


        }
        catch (err:any) {
            Alert.alert("Error", `${err}`);
        }


    }

    function calculateDaysBetweenDates(checkin: string|null | Date, checkout: string|null | Date):number {
        // Convert start and end dates to Date objects if they are strings
        if (checkin === null || checkout === null){
            return 1
        }
        const start = new Date(checkin);
        const end = new Date(checkout);

        // Calculate the difference in time between the two dates
        const timeDifference = end.getTime() - start.getTime();

        // Convert the time difference from milliseconds to days
        const daysDifference = timeDifference / (1000 * 3600 * 24);

        return Math.abs(daysDifference); // Return the absolute value to avoid negative values
    }

    const handleGuestInfo = () => {
        if(guestids.length > 2){
            Alert.alert('Error', 'You cannot add more than 2 guests');

        }else{
            setOpenGuestInfo(true)
        }
    }
    const handleCheckinDateChange = (event: any, selectedDate?: Date) => {
        setOpenCheckinPicker(false);
        if (selectedDate) {
            setCheckin(selectedDate);
        } else {
            setOpenGuestInfo(true)
        }
    };

    const handleCheckoutDateChange = (event: any, selectedDate?: Date) => {
        setOpenCheckoutPicker(false);
        if (selectedDate) {
            if (checkin && selectedDate <= checkin) {
                Alert.alert("Invalid date", "Checkout date cannot be before or the same as check-in date.");
                return 0;
            }
            setCheckout(selectedDate);
        }
    };



    return (
        <Modal
            visible={openBookingForm}
            transparent={true}
        >
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={{margin: 20}} onPress={()=>closeBookingForm()}>
                <Icon name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
                <Text style={styles.headerTitle}>Confirm Create Booking</Text>
            </View>

            {/* Property Information */}
            <View style={styles.section}>
                <View style={styles.propertyInfo}>
                    <Image
                        source={{ uri: image }}
                        style={styles.propertyImage}
                    />
                    <View style={styles.propertyText}>
                        <Text style={styles.propertyTitle}>{roomDetails.roomNumber}</Text>
                        <Text style={styles.propertySubtitle}>{roomDetails.roomType.description}</Text>
                    </View>
                </View>
            </View>

            {/* Check-in and Check-out Dates */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Dates</Text>
                <View style={styles.checkinCheckoutCon}>
                <View style={{ alignItems: "center" }}>
                    <Text>Check-in Date</Text>
                    <TouchableOpacity onPress={() => setOpenCheckinPicker(true)} style={styles.selectDateCont}>
                        <Text style={s.quantityText}>
                            {checkin ? checkin.toLocaleDateString() : "Select a date"}
                        </Text>
                    </TouchableOpacity>
                    {openCheckinPicker && (
                        <DateTimePicker
                            value={checkin || new Date()}
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
                            {checkout ? checkout.toLocaleDateString() : "Select a date"}
                        </Text>
                    </TouchableOpacity>
                    {openCheckoutPicker && (
                        <DateTimePicker
                            value={checkout || new Date()}
                            mode="date"
                            display="default"
                            onChange={handleCheckoutDateChange}
                        />
                    )}
                </View>
            </View>
            </View>
            {/* Trip Details */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Your Stay</Text>
                {guestids.length > 0 && guestids.length <= 2 ? guestids.map(item=><Text key={item.id} style={styles.label}>Guest id: {item.id}</Text>):<Text style={styles.label}>Guest id: null</Text>}
                {/*<View style={styles.row}>
                    <Text style={styles.label}>Dates</Text>
                    <Text style={styles.value}>17–22 Nov</Text>
                    <TouchableOpacity><Text style={styles.editButton}>Edit</Text></TouchableOpacity>
                </View>*/}
                <View style={styles.row}>
                    <Text style={styles.label}>Guests</Text>
                    <Text style={styles.value}>2 guests</Text>
                    <TouchableOpacity onPress={()=> handleGuestInfo()}><Text style={styles.editButton}>Add guest info</Text></TouchableOpacity>
                <GuestDetailsModal open={openGuestInfo} close={closeGuestInfo} setGuestids={setGuestids}/>
                </View>
            </View>

            {/* Price Details */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Price details</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>ksh{roomDetails.roomType.pricePerNight} x {calculateDaysBetweenDates(checkin,checkout)}</Text>
                    <Text style={styles.value}>ksh {roomDetails.roomType.pricePerNight}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label, styles.totalLabel]}>Total Ksh</Text>
                    <Text style={[styles.value, styles.totalValue]}>{roomDetails.roomType.pricePerNight * (calculateDaysBetweenDates(checkin,checkout))}</Text>
                </View>
                <TouchableOpacity><Text style={styles.moreInfo}>More info</Text></TouchableOpacity>
            </View>
            <TouchableOpacity
                style={[styles.buttonContainer,]}
                onPress={handleCreateBooking}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={s.cartText}>Create Booking</Text>
                )}
            </TouchableOpacity>
        </ScrollView></Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
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

export default BookingForm;
