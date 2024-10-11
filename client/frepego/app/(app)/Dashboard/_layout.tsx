import { Stack } from "expo-router";
import {hidden} from "colorette";

export default function DashboardLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }}/>
            {/*<Stack.Screen name="MenuItems"/>*/}
        </Stack>
    );
}