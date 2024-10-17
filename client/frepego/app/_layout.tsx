import {Slot} from "expo-router";
import {SessionProvider} from "@/app/authContext";
import { Provider as PaperProvider } from 'react-native-paper';
import {View, StyleSheet} from "react-native";

export default function Root(){
    return(
        <SessionProvider>
                    <Slot />
        </SessionProvider>
    )
}

