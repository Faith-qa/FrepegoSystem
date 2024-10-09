import s from "@/app/Tables/MenuItems/styles";
import {FlatList, Modal, Text, TouchableOpacity, View} from "react-native";
import ProductItem from "@/app/Tables/MenuItems/Item";
import {CartItem} from "@/app/Tables/MenuItems/menuItemContainer";
import {Icon} from "react-native-elements";
import React from "react";

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
                alert('orderCreated')
                closeCart()
            }}>
                <Text style={s.cartText}>Create Order</Text>
            </TouchableOpacity>
        )}
    </View>
        </Modal>
            )
}

export default CartModal;