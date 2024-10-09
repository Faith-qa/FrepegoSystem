
import s from './styles'
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import { useRoute } from '@react-navigation/native';
import ProductItem from "@/app/Tables/MenuItems/Item";
import {CartItem} from "@/app/Tables/MenuItems/menuItemContainer";
import {useState} from "react";
import CartModal from "@/app/Tables/MenuItems/CartModal";



interface NewProps {
    //selectedItem:any,
    data: any,
    //openAddItem: boolean,
    //setOpenAddItem: (id:any)=> void,
    //closeAddItem: ()=>void,
    removeItemFromCart: (item:CartItem)=> void,
    addItemToCart:(item:CartItem, quantity:number)=>void,
    getTotalPrice: ()=>number;
    cart:CartItem[]
}
const MenuItemScreen: React.FC<NewProps> = (
    {
        data,
        removeItemFromCart,
        addItemToCart,
        getTotalPrice,
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
        <View style={s.container}>
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
            <CartModal addItemToCart={addItemToCart} cart={cart} closeCart={closeCart} openCart={openCart} removeItemFromCart={removeItemFromCart}/>
        </View>
    )
}

export default MenuItemScreen;