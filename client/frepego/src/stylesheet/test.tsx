import { Stack } from "expo-router";
import {hidden} from "colorette";
import {Drawer} from "expo-router/drawer";
import React from "react";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {FontAwesome} from "@expo/vector-icons";
import {View, Image, Text, TouchableOpacity} from "react-native";
import s from './styles'
export default function RootLayout() {
    return (
        <GestureHandlerRootView>
            <Drawer
                screenOptions={{
        drawerStyle: s.drawerStyle,
            headerShown: false, // Hide the header
    }}
    drawerContent={(props) => <CustomDrawerContent  />}
>
    <Drawer.Screen
        name="index"
    options={{
        drawerLabel: 'Home',
            title:'heome',
            drawerIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
    ),
    }}
    />

    {/* Add more screens as needed */}
    </Drawer>
    </GestureHandlerRootView>

    /*<Stack>
      <Stack.Screen name="index"  />
        <Stack.Screen name="Tables"/>
        <Stack.Screen name="MenuItems"  options={{ headerShown: false }}/>

    </Stack>*/
);
}
function CustomDrawerContent() {
    return (
        <View style={s.drawerContainer}>
        <View style={s.profileContainer}>
        <Image
            source={{ uri: 'https://placekitten.com/100/100' }} // Placeholder avatar image
    style={s.avatar}
    />
    <Text style={s.userName}>Faith Okoth</Text>
    </View>

    <View style={s.drawerItemsContainer}>
        {/* Drawer items go here using TouchableOpacity */}
        <TouchableOpacity
    style={s.drawerItem}
    >
    <FontAwesome name="clock-o" size={24} color="#000" />
    <Text style={s.drawerItemText}>Workouts</Text>
        </TouchableOpacity>

        <TouchableOpacity
    style={s.drawerItem}
    >
    <FontAwesome name="folder" size={24} color="#000" />
    <Text style={s.drawerItemText}>Programmes</Text>
        </TouchableOpacity>

        <TouchableOpacity
    style={s.drawerItem}
    >
    <FontAwesome name="bookmark" size={24} color="#000" />
    <Text style={s.drawerItemText}>Saved Workouts</Text>
    </TouchableOpacity>

    <TouchableOpacity
    style={s.drawerItem}
    >
    <FontAwesome name="bar-chart" size={24} color="#000" />
    <Text style={s.drawerItemText}>Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity
    style={s.drawerItem}
    >
    <FontAwesome name="envelope" size={24} color="#000" />
    <Text style={s.drawerItemText}>Inbox</Text>
        </TouchableOpacity>

        <TouchableOpacity
    style={s.drawerItem}
    >
    <FontAwesome name="cog" size={24} color="#000" />
    <Text style={s.drawerItemText}>Settings</Text>
        </TouchableOpacity>
        </View>
        </View>
);
}