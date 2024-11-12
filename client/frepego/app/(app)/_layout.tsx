import {Redirect, Stack, useRouter} from "expo-router";
import {hidden} from "colorette";
import {Drawer} from "expo-router/drawer";
import React, {useEffect, useState} from "react";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Provider, useSelector} from 'react-redux';
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import {View, StyleSheet, Text, ActivityIndicator} from "react-native";
import ProfilePicContainer from "@/componentsUi/ProfilePic";
import {useSession} from "@/app/authContext";
import {LinearGradient} from "expo-linear-gradient";
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import orderItem from "@/componentsUi/OrderComponents/OrderItem";
import OrderCartModal from "@/componentsUi/OrderComponents/OrderCartModal";
import {useQuery} from "@apollo/client";
import {PENDING_ORDERS_QUERY} from "@/app/graph_queries";
export default function AppLayout() {
    const {session, isLoading} = useSession()
    const [pendingOrders, setPendingOrders] = useState<any[]>([]);

    const { data, error, loading } = useQuery(PENDING_ORDERS_QUERY);

    const [openOrderCart, setOpenOrderCart] = useState(false)

    useEffect(() => {
        if (data) {
            setPendingOrders(data.pendingOrders);
            // Optional: Add additional side effects here, e.g., notifications
            console.log("Pending orders updated:", pendingOrders[0]);
        }
    }, [data]);
    //only require authentication withing the (app) groups as users
    // need to be able to access the (auth) group and sign i
    if(!session) {
        return <Redirect href={"/sign-in"}/>
    }
    const closeOrderCart = ()=>{
        setOpenOrderCart(false)
    }

    if(isLoading) {
        return <Text>Loading ...</Text>
    }


  return (
      <GestureHandlerRootView>
          <Drawer
              drawerContent={(props)=><CustomDrawerContent {...props}/>}
              screenOptions={{
                  drawerActiveTintColor: 'white', // Text color when item is selected
                  drawerInactiveTintColor: 'gray', // Text color when item is not selected
                  drawerActiveBackgroundColor: 'rgb(48, 119, 156)', // Background color when item is selected
                  drawerInactiveBackgroundColor: 'transparent', // Background color when item is not selected
          }}

          >
              <Drawer.Screen
                  name="index"
                  options={{
                      drawerLabel: "Home",
                      title: "Home",
                      drawerLabelStyle:{color:"white"},

                  }}
              />
              <Drawer.Screen
                  name={"Tables"}
                  options={{
                      drawerLabel: "Bar and Restaurant",
                      title: 'New order',
                      drawerLabelStyle:{color:"white"},
                      headerRight: () => (
                          <View style={{ flexDirection: "row", alignItems: "center", padding:5, marginRight:15 }}>
                              <Text style={{ fontSize: 20, fontWeight: "normal", textAlign: 'center', color: "black"}}>Pending Orders</Text>
                              {loading ? (
                                  <ActivityIndicator size="small" color="black" style={{ marginLeft: 10 }} />
                              ) : (
                                  <MaterialCommunityIcons
                                      name="cart"
                                      size={24}
                                      color="black"
                                      style={{ marginLeft: 10 }}
                                      onPress={() => setOpenOrderCart(true)}
                                  />
                              )}
                              <View
                                  style={{
                                      position: "absolute",
                                      right: -5,
                                      top: -5,
                                      //backgroundColor: "red",
                                      borderRadius: 10,
                                      width: 18,
                                      height: 18,
                                      justifyContent: "center",
                                      alignItems: "center",
                                  }}
                              >
                                  <Text style={{ color: "red", fontSize: 12 }}>{pendingOrders.length}</Text>
                              </View>
                              <OrderCartModal orderCart={pendingOrders} closeOrderCart={closeOrderCart} openOrderCart={openOrderCart} setOrderCart={setPendingOrders}/>

                          </View>
                      ),

                  }}
              />
              <Drawer.Screen
                  name={"Dash_tables"}
                  options={{
                      drawerLabel: "Tables",
                      title: 'Tables',
                      drawerLabelStyle:{color:"white"}
                  }}
              />
              <Drawer.Screen
                  name={"Bookings"}
                  options={{
                      drawerLabel: "Book a room",
                      title: 'Create a booking',
                      drawerLabelStyle:{color:"white"},
                      headerRight: () => (
                          <View style={{ flexDirection: "row", alignItems: "center", padding:5, marginRight:15 }}>
                              <Text style={{ fontSize: 20, fontWeight: "normal", textAlign: 'center', color: "black"}}>Pending Orders</Text>
                              {loading ? (
                                  <ActivityIndicator size="small" color="black" style={{ marginLeft: 10 }} />
                              ) : (
                                  <MaterialCommunityIcons
                                      name="cart"
                                      size={24}
                                      color="black"
                                      style={{ marginLeft: 10 }}
                                      onPress={() => setOpenOrderCart(true)}
                                  />
                              )}
                              <View
                                  style={{
                                      position: "absolute",
                                      right: -5,
                                      top: -5,
                                      //backgroundColor: "red",
                                      borderRadius: 10,
                                      width: 18,
                                      height: 18,
                                      justifyContent: "center",
                                      alignItems: "center",
                                  }}
                              >
                                  <Text style={{ color: "red", fontSize: 12 }}>{pendingOrders.length}</Text>
                              </View>
                              <OrderCartModal orderCart={pendingOrders} closeOrderCart={closeOrderCart} openOrderCart={openOrderCart} setOrderCart={setPendingOrders}/>

                          </View>
                      ),

                  }}
              />
              <Drawer.Screen
                  name={"Dashboard"}
                  options={{
                      drawerLabel: "Analytics",
                      title: 'Analytics',
                      drawerLabelStyle:{color:"white"}
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

function CustomDrawerContent(props:any){
    return(
        <LinearGradient
            colors={['rgb(48, 119, 156)', 'rgb(20, 89, 125)']}
            style={{ flex: 1 }} // Ensure gradient covers the full drawer
        >
            <DrawerContentScrollView
                {...props}
                style={{ padding: 10,  }} // Ensures the content takes full space
            >
                <ProfilePicContainer />
                <Text style={{color:"white", paddingTop: 20 }}>Welcome James</Text>
                <View
                    style={{
                        borderBottomColor: 'white',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        marginTop: 30,
                        marginBottom:30
                    }}
                />
                <DrawerItemList {...props} />
                <DrawerItem label="Help" onPress={() => alert('Link to help')}labelStyle={{ color: 'white' }} />
            </DrawerContentScrollView>
        </LinearGradient>)

}
