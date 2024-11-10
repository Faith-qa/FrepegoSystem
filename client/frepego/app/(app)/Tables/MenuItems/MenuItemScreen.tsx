
import s from './styles'
import {FlatList, Image, Text, TouchableOpacity, View, ImageBackground} from "react-native";
import {Icon} from "react-native-elements";
import { useRoute } from '@react-navigation/native';
import ProductItem from "@/app/(app)/Tables/MenuItems/Item";
import {CartItem} from "@/app/(app)/Tables/MenuItems/menuItemContainer";
import {useState} from "react";
import CartModal from "@/app/(app)/Tables/MenuItems/CartModal";



interface NewProps {
    //selectedItem:any,
    data: any,
    //openAddItem: boolean,
    //setOpenAddItem: (id:any)=> void,
    //closeAddItem: ()=>void,
    removeItemFromCart: (item:CartItem)=> void,
    addItemToCart:(item:CartItem, quantity:number)=>void,
    getTotalPrice: ()=>number;
    cart:CartItem[],
    tableNumber: number,
}
const MenuItemScreen: React.FC<NewProps> = (
    {
        data,
        removeItemFromCart,
        addItemToCart,
        getTotalPrice,
        tableNumber,
        cart

    }
)=>{
    const [openCart, setOpenCart] = useState(false)
    const openingCart = ()=>{
        setOpenCart(true)
    }
    const closeCart = () =>{
        setOpenCart(false)
    }

    return(
        <ImageBackground
            source={{uri: "https://images.unsplash.com/photo-1524947820859-81b71fe05edc?q=80&w=2833&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}} // Replace with the background image link
            style={s.container}>
        {/*<View style={s.container}>*/}
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <ProductItem item={item} addItemToCart={addItemToCart} cart={cart} removeItemFromCart={removeItemFromCart}/>
                )}
                keyExtractor={(item) => item.id}
            />
            {/* View Cart Button */}
            {cart.length > 0 && (
                <TouchableOpacity style={s.cartButton} onPress={() => openingCart()}>
                    <Text style={s.cartText}>View Orders • KSh{getTotalPrice()}.00</Text>
                </TouchableOpacity>
            )}
            <CartModal addItemToCart={addItemToCart} cart={cart} closeCart={closeCart} openCart={openCart} removeItemFromCart={removeItemFromCart} TableNumber={tableNumber}/>
        </ImageBackground>
    )
}

export default MenuItemScreen;