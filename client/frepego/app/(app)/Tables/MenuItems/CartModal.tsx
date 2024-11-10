import s from "@/app/(app)/Tables/MenuItems/styles";
import {ActivityIndicator, FlatList, Modal, Text, TouchableOpacity, View} from "react-native";
import ProductItem from "@/app/(app)/Tables/MenuItems/Item";
import {CartItem, OrderItem} from "@/app/(app)/Tables/MenuItems/menuItemContainer";
import {Icon} from "react-native-elements";
import React, {useEffect, useState} from "react";
import OrderCreatedScreen from "@/componentsUi/OrderComponents/OrderCreatedScreen";
import {useMutation} from "@apollo/client";
import {CREATE_ORDER_MUTATION} from "@/app/graph_queries";


interface NewProps{
    cart: CartItem[],
    openCart: boolean,
    removeItemFromCart: (item:CartItem)=> void,
    addItemToCart:(item:CartItem, quantity:number)=>void,
    closeCart: () => void,
    TableNumber:number;
}
const CartModal:React.FC<NewProps> = ({
    cart,
    removeItemFromCart,
    addItemToCart,
                                          closeCart,
                                          openCart, TableNumber
                                      }) =>{

    const[orderView, setOrderView] = useState(false)
    const [orderItem, setOrderItem] = useState<any|null>(null)
    const [createOrder, {loading, error, data}] = useMutation(CREATE_ORDER_MUTATION)

    //generate 3 random numbers
    useEffect(() => {
        if (data?.createOrder){
            setOrderItem(data.createOrder.order)


        }

    }, [data]);




    // create order
    const handleCreateOrder = async(tableNumber:number)=> {
        const orderItems = cart.map(item => ({
            menuItemId: item.id,  // Ensure correct field name
            quantity: item.quantity,
        }));
        await createOrder({
            variables: {
                tableNumber: tableNumber,
                orderItems,
            }
        })
        setOrderView(true)
        alert(`order ${data.createOrder.order.orderNumber} successfully created`)



    }

    const closeOrderView = ()=>{
        setOrderView(false)
    }
    console.log("this is me",data?.createOrder.order)
    console.log("open screen", orderView)
    return(
        <Modal
            visible={openCart}
        >
    <View style={s.container}>
        <TouchableOpacity onPress={()=>closeCart()} style={{margin: 20, }}>
        <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <FlatList
            data={cart}
            renderItem={({ item }) => (
                <ProductItem item={item} addItemToCart={addItemToCart} cart={cart} removeItemFromCart={removeItemFromCart}/>
            )}
            keyExtractor={(item) => item.id}
        />
        {/* View Cart Button*/}
        {cart.length > 0 && (
            <TouchableOpacity style={s.cartButton} onPress={async() => {
                //TODO CREATE ORDER FUNCTIONALITY
                await handleCreateOrder(TableNumber)
            }}>
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={s.cartText}>Create Order</Text>
                )}
            </TouchableOpacity>
        )}
    </View>
            {data?.createOrder && orderItem !== null &&<OrderCreatedScreen
                    createOrderView={orderView}
                    closeCreatedOrder={closeOrderView}
                    command={"continue"}
                    closeCart={closeCart}
                    order={orderItem}
                />}</Modal>
            )
}

export default CartModal;