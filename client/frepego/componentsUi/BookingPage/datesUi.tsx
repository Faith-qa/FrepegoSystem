import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import s from "@/app/(app)/Tables/MenuItems/styles";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import Feather from '@expo/vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatesUi: React.FC = () => {
    const [rooms, setRooms] = useState([{ id: 1, guests: 1 }]);
    const [openCheckinPicker, setOpenCheckinPicker] = useState(false);
    const [openCheckoutPicker, setOpenCheckoutPicker] = useState(false);
    const [dates, setDates] = useState<{ checkin: Date | null; checkout: Date | null }>({
        checkin: null,
        checkout: null
    });

    const handleAddRoomClick = () => {
        setRooms([...rooms, { id: rooms.length + 1, guests: 1 }]);
    };

    const handleRemoveRoomClick = (id: number) => {
        setRooms(rooms.filter((room) => room.id !== id));
    };

    const handleGuestChange = (id: number, guests: number) => {
        setRooms(
            rooms.map((room) =>
                room.id === id ? { ...room, guests: guests } : room
            )
        );
    };

    const handleCheckinDateChange = (event: any, selectedDate?: Date) => {
        setOpenCheckinPicker(false);
        if (selectedDate) {
            setDates((prevDates) => ({
                ...prevDates,
                checkin: selectedDate
            }));
        }
    };

    const handleCheckoutDateChange = (event: any, selectedDate?: Date) => {
        setOpenCheckoutPicker(false);
        if (selectedDate) {
            // Validate that checkout date is not earlier than check-in date
            if (dates.checkin && selectedDate <= dates.checkin) {
                Alert.alert("Invalid date", "Checkout date cannot be before or the same as check-in date.");
                return;
            }
            setDates((prevDates) => ({
                ...prevDates,
                checkout: selectedDate
            }));
        }
    };

    const renderRoom = (room: { id: number; guests: number }) => {
        return (
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
                                room.guests > 1
                                    ? handleGuestChange(room.id, room.guests - 1)
                                    : null
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
    };

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
            {/* Render all rooms */}
            {rooms.map((room) => renderRoom(room))}
            <View style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
                <TouchableOpacity
                    onPress={handleAddRoomClick}
                    style={{ flexDirection: "row", alignItems: "center" }}
                >
                    <Icon name={"add"} size={20} color={"rgb(109, 89, 52)"} />
                    <Text>Add another room</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.titleText}>Select dates</Text>
                <View style={styles.checkinCheckoutCon}>
                {/* Check-in Date */}
                    <View style={{alignItems: "center"}}>
                    <Text>Check-in Date</Text>
                <TouchableOpacity onPress={() => setOpenCheckinPicker(true)} style={styles.selectDateCont}>
                    <Text style={s.quantityText}>
                         {dates.checkin ? dates.checkin.toLocaleDateString() : "Select a date"}
                    </Text>
                </TouchableOpacity>
                {openCheckinPicker && (
                    <DateTimePicker
                        value={dates.checkin || new Date()}
                        mode="date"
                        display="default"
                        onChange={handleCheckinDateChange}
                    />
                )}</View>

                {/* Check-out Date */}
                    <View style={{alignItems: "center"}}>
                    <Text> Check-out Date:</Text>
                <TouchableOpacity onPress={() => setOpenCheckoutPicker(true)}
                                  style={styles.selectDateCont}
                >
                    <Text style={s.quantityText}>
                        {dates.checkout ? dates.checkout.toLocaleDateString() : "Select a date"}
                    </Text>
                </TouchableOpacity>
                {openCheckoutPicker && (
                    <DateTimePicker
                        value={dates.checkout || new Date()}
                        mode="date"
                        display="default"
                        onChange={handleCheckoutDateChange}
                    />
                )}</View>
                    </View>
                {/*TODO: Select room type i.e Conference hall, dylux, standard */}

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    titleText: {
        alignSelf: "center",
        padding: 10,
    },
    checkinCheckoutCon: {
        padding: 10,
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    selectDateCont: {
        //borderWidth: 1,
        borderRadius: 10,
        margin: 5,
        padding: 10,
        backgroundColor: "green",
    },
    buttonText: {
        color: "white"
    }

});

export default DatesUi;
