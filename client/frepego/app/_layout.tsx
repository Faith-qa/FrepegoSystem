import {Redirect, Slot} from "expo-router";
import {SessionProvider, useSession} from "@/app/authContext";
import { Provider as PaperProvider } from 'react-native-paper';
import {View, StyleSheet, Text} from "react-native";
import React from "react";


export default function Root(){

    return(
        <SessionProvider>
                    <Slot />
        </SessionProvider>
    )
}

