import { View, Text, TouchableOpacity } from "react-native";
import s from "@/app/(app)/Tables/MenuItems/styles";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import Feather from '@expo/vector-icons/Feather';
import {Calendar, useDateRange} from "@marceloterreiro/flash-calendar";

const DatesUi: React.FC = () => {
    const [rooms, setRooms] = useState([{ id: 1, guests: 1 }]);

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

    const renderRoom = (room: { id: number; guests: number }) => {
        return (
            <View
                key={room.id}
                style={{
                    flexDirection: "row",
                    //marginHorizontal: 20,
                    justifyContent: "space-between",
                    padding: 10,
                }}
            >
                <Text>Room {room.id}</Text>
                <View style={{flexDirection: "row"}}>
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
                    <TouchableOpacity onPress={() => handleRemoveRoomClick(room.id)} style={{padding: 5}}>
                        <Feather name="x" size={24} color="red" /></TouchableOpacity>
                ) : <TouchableOpacity style={{padding: 5}}>
                    <Feather name="x" size={24} color="white" /></TouchableOpacity>}
                </View>
            </View>
        );
    };

    return (
        <View
            style={{
                //width: "97%",
                margin: 10,
                backgroundColor: "white",
                padding: 10,
                elevation: 2,
            }}
        >
            <Text style={{ alignSelf: "center", padding: 10 }}>
                Select the number of guests
            </Text>
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
                <Text>Select dates</Text>
            </View>
        </View>
    );
};

export default DatesUi;
