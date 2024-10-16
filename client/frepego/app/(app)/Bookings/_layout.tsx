import { Stack } from "expo-router";
import {hidden} from "colorette";

export default function Bookings_Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }}/>
        </Stack>
    );
}