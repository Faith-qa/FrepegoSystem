import { Stack } from "expo-router";
import {hidden} from "colorette";
import {Drawer} from "expo-router/drawer";
import React from "react";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {store} from "@/store/store";
import {Provider, useSelector} from 'react-redux';
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import {View, StyleSheet} from "react-native";
import ProfilePicContainer from "@/componentsUi/ProfilePic";

export default function RootLayout() {
  return (
      <Provider store={store}>

      <GestureHandlerRootView>
          <Drawer
              drawerContent={(props)=><CustomDrawerContent {...props}/>}
          >
              <Drawer.Screen
                  name="index"
                  options={{
                      drawerLabel: "Home",
                      title: "Home",
                  }}
              />
              <Drawer.Screen
                  name={"Tables"}
                  options={{
                      drawerLabel: "Bar and Restaurant",
                      title: 'create an order'
                  }}
              />

          </Drawer>
      </GestureHandlerRootView></Provider>

    /*<Stack>
      <Stack.Screen name="index"  />
        <Stack.Screen name="Tables"/>
        <Stack.Screen name="MenuItems"  options={{ headerShown: false }}/>

    </Stack>*/
  );
}

function CustomDrawerContent(props:any){
    return(
    <DrawerContentScrollView {...props} >
        <ProfilePicContainer/>
        <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginTop: 30
            }}
        />
        <DrawerItemList {...props} />
        <DrawerItem label="Help" onPress={() => alert('Link to help')} />
    </DrawerContentScrollView>)

}
