import {Redirect, Stack} from "expo-router";
import {hidden} from "colorette";
import {Drawer} from "expo-router/drawer";
import React from "react";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {store} from "@/store/store";
import {Provider, useSelector} from 'react-redux';
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import {View, StyleSheet, Text} from "react-native";
import ProfilePicContainer from "@/componentsUi/ProfilePic";
import {useSession} from "@/app/authContext";

export default function AppLayout() {
    const {session, isLoading} = useSession()

    /*if(isLoading) {
        return <Text>Loading ...</Text>
    }
    //only require authentication withing the (app) groups as users
    // need to be able to access the (auth) group and sign in

    if(!session) {
        return <Redirect href={"/sign-in"}/>
    }*/
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
              <Drawer.Screen
                  name={"Dash_tables"}
                  options={{
                      drawerLabel: "Tables",
                      title: 'Tables'
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
    <DrawerContentScrollView {...props} style={{padding: 10}}>
        <ProfilePicContainer/>
        <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginTop: 30
            }}
        />
        <DrawerItemList {...props} />
        <DrawerItem label="Help" onPress={() => alert('Link to help')}/>
    </DrawerContentScrollView>)

}
