import { Stack } from "expo-router";
import {hidden} from "colorette";
import {Drawer} from "expo-router/drawer";
import React from "react";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {FontAwesome} from "@expo/vector-icons";
import {View, Image, Text, TouchableOpacity} from "react-native";
import s from '@/src/stylesheet/styles'
export default function RootLayout() {
  return (
      <GestureHandlerRootView>
          <Drawer>
              <Drawer.Screen
                  name="index"
                  options={{
                      drawerLabel:"Bar & Restaurant",
                      title:"create an Order"
                  }}
              />

          </Drawer>
      </GestureHandlerRootView>

    /*<Stack>
      <Stack.Screen name="index"  />
        <Stack.Screen name="Tables"/>
        <Stack.Screen name="MenuItems"  options={{ headerShown: false }}/>

    </Stack>*/
  );
}
