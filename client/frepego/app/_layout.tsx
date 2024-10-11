import {Slot} from "expo-router";
import {SessionProvider} from "@/app/authContext";

export default function Root(){
    return(
        <SessionProvider>
            <Slot/>
        </SessionProvider>
    )
}