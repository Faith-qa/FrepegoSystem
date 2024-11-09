import {OrderItem} from "@/app/(app)/Tables/MenuItems/menuItemContainer";
import {FlatList, Modal, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import s from "@/app/(app)/Tables/MenuItems/styles";
import {Icon} from "react-native-elements";
import OrderCreatedScreen from "@/componentsUi/OrderComponents/OrderCreatedScreen";
import React, {useState} from "react";
import OrderItemCont from "@/componentsUi/OrderComponents/OrderItem";
import {LinearGradient} from "expo-linear-gradient";

interface NewProps{
    orderCart: OrderItem[];
    //createOrder: (newOrder:OrderItem)=>Promise<void>;
    //completeOrder: (id: OrderItem["id"])=>Promise<void>;
    closeOrderCart: ()=>void;
    openOrderCart: boolean;

}

const OrderCartModal:React.FC<NewProps> = ({orderCart, openOrderCart,closeOrderCart,})=> {
    const [orderView, setOrderView] = useState(false)

    const completeOrder = () => {
        // TODO Implement Apollo query
    }
    const closeOrderView = () => {
        setOrderView(false)
    }
    return( <Modal
        visible={openOrderCart}
    >
         <View style={s.container}>
            <TouchableOpacity onPress={()=>closeOrderCart()} style={{margin: 20, }}>
                <Icon name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
             {orderCart.length > 0 ?<FlatList
                data={orderCart}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=> setOrderView(true)} >
                        <OrderItemCont orderItem={item}/>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />: <View style={[s.container, {marginTop: 40, alignItems: "center", padding: 40}]}>
             <Text style={{margin: 30, fontSize: 25}}>No Pending Orders</Text>

                 <TouchableOpacity onPress={() => {
                     //alert('orderCreated')
                     //closeCart()
                 }}>
                     <LinearGradient colors={['#1976D2', '#42A5F5']} style={styles.newOrderButton}>
                     <Text style={s.cartText}>Create Order</Text></LinearGradient>
                 </TouchableOpacity>
         </View>}
            {/* View Cart Button*/}
        <OrderCreatedScreen createOrderView={orderView} closeCreatedOrder={closeOrderView} command={"complete the order"}/>
        </View>
    </Modal>)
}

const styles = StyleSheet.create({

    newOrderButton:{
        padding: 10,
        height: 60,
        //flexDirection: "row",
        width: 190,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
       // zIndex: 20,
    }

})
export default OrderCartModal;