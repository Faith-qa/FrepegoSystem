import {View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground} from "react-native";
import s from "@/app/(app)/Tables/MenuItems/styles";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import Feather from '@expo/vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";

const DatesUi: React.FC = () => {
    // Combine rooms, dates, and roomType into a single state object called bookings
    const [bookings, setBookings] = useState({
        rooms: [{ id: 1, guests: 1 }],
        dates: { checkin: null as Date | null, checkout: null as Date | null },
        roomType: "Conference" as "Conference" | "Dilux" | "Standard"|undefined,
    });

    // Function to check if all bookings data is filled
    const isBookingComplete = () => {
        return (
            bookings.rooms.length > 0 &&
            bookings.dates.checkin !== null &&
            bookings.dates.checkout !== null &&
            bookings.roomType !== undefined
        );
    };

    const [openCheckinPicker, setOpenCheckinPicker] = useState(false);
    const [openCheckoutPicker, setOpenCheckoutPicker] = useState(false);

    const handleAddRoomClick = () => {
        setBookings((prev) => ({
            ...prev,
            rooms: [...prev.rooms, { id: prev.rooms.length + 1, guests: 1 }],
        }));
    };

    const handleRemoveRoomClick = (id: number) => {
        setBookings((prev) => ({
            ...prev,
            rooms: prev.rooms.filter((room) => room.id !== id),
        }));
    };

    const handleGuestChange = (id: number, guests: number) => {
        setBookings((prev) => ({
            ...prev,
            rooms: prev.rooms.map((room) =>
                room.id === id ? { ...room, guests } : room
            ),
        }));
    };

    const handleCheckinDateChange = (event: any, selectedDate?: Date) => {
        setOpenCheckinPicker(false);
        if (selectedDate) {
            setBookings((prev) => ({
                ...prev,
                dates: { ...prev.dates, checkin: selectedDate },
            }));
        }
    };

    const handleCheckoutDateChange = (event: any, selectedDate?: Date) => {
        setOpenCheckoutPicker(false);
        if (selectedDate) {
            // Validate that checkout date is not earlier than check-in date
            if (bookings.dates.checkin && selectedDate <= bookings.dates.checkin) {
                Alert.alert("Invalid date", "Checkout date cannot be before or the same as check-in date.");
                return;
            }
            setBookings((prev) => ({
                ...prev,
                dates: { ...prev.dates, checkout: selectedDate },
            }));
        }
    };

    const handleRoomTypeChange = (itemValue: "Conference" | "Dilux" | "Standard") => {
        setBookings((prev) => ({
            ...prev,
            roomType: itemValue,
        }));
    };

    const renderRoom = (room: { id: number; guests: number }) => (
        <View
            key={room.id}
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
            }}
        >
            <Text>Room {room.id}</Text>
            <View style={{ flexDirection: "row" }}>
                <View style={[s.quantityContainer]}>
                    <TouchableOpacity
                        style={s.button}
                        onPress={() =>
                            room.guests > 1 ? handleGuestChange(room.id, room.guests - 1) : null
                        }
                    >
                        <Text style={s.buttonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={s.quantityText}>{room.guests}</Text>
                    <TouchableOpacity
                        style={s.button}
                        onPress={() => handleGuestChange(room.id, room.guests + 1)}
                    >
                        <Text style={s.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
                {room.id > 1 ? (
                    <TouchableOpacity onPress={() => handleRemoveRoomClick(room.id)} style={{ padding: 5 }}>
                        <Feather name="x" size={24} color="red" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={{ padding: 5 }}>
                        <Feather name="x" size={24} color="white" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    return (
        <View
            style={{
                margin: 10,
                backgroundColor: "white",
                padding: 10,
                elevation: 2,
            }}
        >
            <Text style={styles.titleText}>Select the number of guests</Text>
            {bookings.rooms.map((room) => renderRoom(room))}
            <View style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
                <TouchableOpacity
                    onPress={handleAddRoomClick}
                    style={{ flexDirection: "row", alignItems: "center" }}
                >
                    <Icon name={"add"} size={20} color={"rgb(109, 89, 52)"} />
                    <Text>Add another room</Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    padding:10,
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    //elevation: 3,
                }}
            />
            <View>
                <Text style={styles.titleText}>Select dates</Text>
                <View style={styles.checkinCheckoutCon}>
                    <View style={{ alignItems: "center" }}>
                        <Text>Check-in Date</Text>
                        <TouchableOpacity onPress={() => setOpenCheckinPicker(true)} style={styles.selectDateCont}>
                            <Text style={s.quantityText}>
                                {bookings.dates.checkin ? bookings.dates.checkin.toLocaleDateString() : "Select a date"}
                            </Text>
                        </TouchableOpacity>
                        {openCheckinPicker && (
                            <DateTimePicker
                                value={bookings.dates.checkin || new Date()}
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
                                {bookings.dates.checkout ? bookings.dates.checkout.toLocaleDateString() : "Select a date"}
                            </Text>
                        </TouchableOpacity>
                        {openCheckoutPicker && (
                            <DateTimePicker
                                value={bookings.dates.checkout || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleCheckoutDateChange}
                            />
                        )}
                    </View>
                </View>
                <View
                    style={{
                        padding:10,
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />

                <View style={{ margin: 10 }}>
                    <Text style={styles.titleText}>Which room would you like to book?</Text>
                    <Picker
                        selectedValue={bookings.roomType}
                        onValueChange={(itemValue: "Conference" | "Dilux" | "Standard") => handleRoomTypeChange(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Conference" value="Conference" />
                        <Picker.Item label="Dilux" value="Dilux" />
                        <Picker.Item label="Standard" value="Standard" />
                    </Picker>
                </View>
                {isBookingComplete() && (

                    <View>
                        <View
                            style={{
                                padding:10,
                                borderBottomColor: 'black',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                //elevation: 3,
                            }}
                        />
                    <TouchableOpacity style={styles.cartButton} onPress={() => alert('Booking Created')}>
                        <Text style={s.cartText}>Create Booking</Text>
                    </TouchableOpacity>
                </View>)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    titleText: {
        alignSelf: "flex-start",
        padding: 16,
        fontSize: 16,
        fontWeight: "bold",
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
        backgroundColor: "green",
    },
    picker: {
        height: 50,
        width: "100%",
        borderColor: "gray",
        borderWidth: 1,
    },
    cartButton: {
        marginTop: 20,
        backgroundColor: 'green',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default DatesUi;
