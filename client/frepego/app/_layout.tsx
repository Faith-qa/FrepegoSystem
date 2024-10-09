import { Stack } from "expo-router";
import {hidden} from "colorette";
import {Drawer} from "expo-router/drawer";
import React from "react";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {store} from "@/store/store";
import {Provider, useSelector} from 'react-redux';

export default function RootLayout() {
  return (
      <Provider store={store}>

      <GestureHandlerRootView>
          <Drawer>
              <Drawer.Screen
                  name="index"
                  options={{
                      drawerLabel:"Bar & Restaurant",
                      title:"create an Order"
                  }}
              />
              <Drawer.Screen
                  name={"Tables"}/>

          </Drawer>
      </GestureHandlerRootView></Provider>

    /*<Stack>
      <Stack.Screen name="index"  />
        <Stack.Screen name="Tables"/>
        <Stack.Screen name="MenuItems"  options={{ headerShown: false }}/>

    </Stack>*/
  );
}
