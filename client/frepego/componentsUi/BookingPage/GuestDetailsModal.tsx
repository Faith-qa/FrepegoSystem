import React, { useState } from "react";
import {Modal, Text, TextInput, View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator} from "react-native";
import {Icon} from "react-native-elements";
import {useMutation} from "@apollo/client";
import {CREATE_GUEST_MUTATION} from "@/app/graph_queries";
import {useLoadingContainerStyle} from "expo-dev-launcher/bundle/components/EASUpdatesRows";


interface NewProps{
    open: boolean;
    close: ()=> void;
    setGuestids: React.Dispatch<React.SetStateAction<any[]>>

}
const GuestDetailsModal: React.FC<NewProps> = ({open, close, setGuestids}) => {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const[createGuest, {loading, error, data}] = useMutation(CREATE_GUEST_MUTATION)



    const handleSubmit = async () => {
        try {
            if (name === "") {
                throw new Error("name cannot be blank");
            }
            if (phoneNumber === "") {
                throw new Error("phone number cannot be blank");
            }
            if (idNumber === "") {
                throw new Error("ID/passport number cannot be blank");
            }

            // Directly capture the result of createGuest mutation call
            const { data } = await createGuest({
                variables: {
                    name: name,
                    phone_number: phoneNumber,
                    id_number: idNumber,
                },
            });

            // Check if data is received successfully
            if (data && data.createGuest && data.createGuest.guest) {
                // Add the new guest ID as an object to the guestIds array
                setGuestids((prevGuestIds) => [
                    ...prevGuestIds,
                    { id: data.createGuest.guest.id },
                ]);
            } else {
                console.log("Guest creation returned no data.");
            }

            close();
        } catch (error:any) {
            console.error(error.message);
        }
    };


    return (
        <Modal transparent={true} animationType="slide" visible={open}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                    <TouchableOpacity style={{margin: 20}} onPress={()=>close()}>
                        <Icon name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Guest Information</Text>
                </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.labelText}>Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter name"
                            value={name}
                            onChangeText={setName}
                        />
                        <Text style={styles.labelText}>Phone Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter phone number"
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                        <Text style={styles.labelText}>ID Number/Passport Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter ID or passport number"
                            value={idNumber}
                            onChangeText={setIdNumber}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        {loading ? <ActivityIndicator size={"small"} color="#fff"/> :<Text style={styles.buttonText}>Submit</Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    titleText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    inputContainer: {
        width: "100%",
        marginBottom: 20,
    },
    labelText: {
        fontSize: 14,
        color: "#333",
        marginBottom: 5,
        fontWeight: "bold"
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#4CAF50",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
});

export default GuestDetailsModal;
