import s from "@/app/(app)/Tables/MenuItems/styles";
import {FlatList, Modal, Text, TouchableOpacity, View} from "react-native";
import ProductItem from "@/app/(app)/Tables/MenuItems/Item";
import {CartItem} from "@/app/(app)/Tables/MenuItems/menuItemContainer";
import {Icon} from "react-native-elements";
import React, {useState} from "react";
import OrderCreatedScreen from "@/componentsUi/OrderComponents/OrderCreatedScreen";


interface NewProps{
    cart: CartItem[],
    openCart: boolean,
    removeItemFromCart: (item:CartItem)=> void,
    addItemToCart:(item:CartItem, quantity:number)=>void,
    closeCart: () => void
}
const CartModal:React.FC<NewProps> = ({
    cart,
    removeItemFromCart,
    addItemToCart,
                                          closeCart,
                                          openCart
                                      }) =>{

    const[orderView, setOrderView] = useState(false)

    const closeOrderView = ()=>{
        setOrderView(false)
    }
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
            <TouchableOpacity style={s.cartButton} onPress={() => {
                //alert('orderCreated')
                //closeCart()
                setOrderView(true)
            }}>
                <Text style={s.cartText}>Create Order</Text>
            </TouchableOpacity>
        )}
    </View>
            <OrderCreatedScreen createOrderView={orderView} closeCreatedOrder={closeOrderView} command={"continue"}/>
        </Modal>
            )
}

export default CartModal;