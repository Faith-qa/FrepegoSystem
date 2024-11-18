import {OrderItem} from "@/app/(app)/Tables/MenuItems/menuItemContainer";
import {FlatList, Modal, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import s from "@/app/(app)/Tables/MenuItems/styles";
import {Icon} from "react-native-elements";
import OrderCreatedScreen from "@/componentsUi/OrderComponents/OrderCreatedScreen";
import React, {useState} from "react";
import OrderItemCont from "@/componentsUi/OrderComponents/OrderItem";
import {LinearGradient} from "expo-linear-gradient";
import {Link} from "expo-router";
import {useMutation} from "@apollo/client";
import {UPDATE_ORDER_STATUS} from "@/app/graph_queries";

interface NewProps{
    orderCart: OrderItem[];
    //createOrder: (newOrder:OrderItem)=>Promise<void>;
    //completeOrder: (id: OrderItem["id"])=>Promise<void>;
    closeOrderCart: ()=>void;
    openOrderCart: boolean;
    setOrderCart: React.Dispatch<React.SetStateAction<any[]>>; // Correct type for state setter

}

const OrderCartModal:React.FC<NewProps> = ({orderCart, openOrderCart,closeOrderCart,setOrderCart})=> {
    const [orderView, setOrderView, ] = useState(false)
    const [updatePendindOrder, {loading, error, data}] = useMutation(UPDATE_ORDER_STATUS)

    const handleCompleteOrder = async(item:any) => {
        const order_id = item.id
        await updatePendindOrder({
            variables:{
                orderId: order_id
            }
        })

        closeOrderView()


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
                    <View>
                    <TouchableOpacity onPress={()=> setOrderView(true)} >
                        <OrderItemCont orderItem={item}/>
                    </TouchableOpacity>
                        <OrderCreatedScreen createOrderView={orderView} closeCreatedOrder={closeOrderView} command={"complete the order"} order={item}/>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />: <View style={[s.container, {marginTop: 40, alignItems: "center", padding: 40}]}>
             <Text style={{margin: 30, fontSize: 25}}>No Pending Orders</Text>
                <Link href={'/Tables/'} asChild>
                 <TouchableOpacity onPress={()=> closeOrderCart()}>
                     <LinearGradient colors={['#1976D2', '#42A5F5']} style={styles.newOrderButton}>
                     <Text style={s.cartText}>Create Order</Text></LinearGradient>
                 </TouchableOpacity></Link>
         </View>}
            {/* View Cart Button*/}
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