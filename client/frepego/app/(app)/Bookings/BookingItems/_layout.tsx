import {Stack} from "expo-router";


export default function BookingItemLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false, presentation: "modal"}}/>
        </Stack>
    );
}
