import React, {useEffect, useState} from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import s from "@/app/(app)/Dash_tables/styles";
import {useSession} from "@/app/authContext";
import { useRouter } from 'expo-router';  // Import the router hook for navigation

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, isLoading, session } = useSession(); // Access the signIn function and session state

    const router = useRouter();  // Initialize router for navigation

    const handleLogin = () => {
        // Handle login logic here
        signIn();
        console.log('Email:', email);
        console.log('Password:', password);

    };

    // useEffect to watch session state and redirect on successful login
    useEffect(() => {
        if (session) {
            // Redirect to home or dashboard once the session is active
            router.replace('/(app)');
        }
    }, [session]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log In</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
            />

                <TouchableOpacity  onPress={handleLogin}>
                    <LinearGradient
                        colors={['#1976D2', '#42A5F5']} // gradient colors (blue shades)
                        style={styles.button}
                    >
                <Text style={styles.buttonText}>Log In</Text></LinearGradient>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    button: {
        height: 50,
        //backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

