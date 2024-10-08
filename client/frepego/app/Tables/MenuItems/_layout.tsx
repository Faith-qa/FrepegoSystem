import { Stack } from "expo-router";
import {hidden} from "colorette";

export default function MenuItemLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>
        </Stack>
    );
}
