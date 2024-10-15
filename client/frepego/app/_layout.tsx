import {Slot} from "expo-router";
import {SessionProvider} from "@/app/authContext";
import { Provider as PaperProvider } from 'react-native-paper';

export default function Root(){
    return(
        <SessionProvider>
            <Slot/>
        </SessionProvider>
    )
}