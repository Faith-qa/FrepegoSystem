import React, {useEffect, useState} from "react";
import {Button, Image, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import s from './styles';
import {useDispatch, useSelector} from "react-redux";
import {CartItem} from "@/app/Tables/MenuItems/menuItemContainer";


interface NewProps{
    cart: CartItem[],
    item: any,
    removeItemFromCart: (item:CartItem)=> void,
    addItemToCart:(item:CartItem, quantity:number)=>void,
}
const ProductItem:React.FC<NewProps> = ({
    item,
    cart,
    addItemToCart,
                                            removeItemFromCart

                              }) => {
    const [isSelected, setIsSelected] = useState(false)
    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
        const cartItem = cart.find(cartItem=> cartItem.id === item.id)
        if (cartItem) {
            setIsSelected(true)
            setQuantity(cartItem.quantity)
        } else {
            setIsSelected(false);
            setQuantity(0)
        }
    }, [cart, item.id]);



    const handleSelectedItem = () => {
        setIsSelected(true)
        setQuantity(1);
        addItemToCart(item, 1);

    }

    const incrementQuantity = () => {
        const newQuantity = quantity + 1
        setQuantity(newQuantity)
        addItemToCart(item, 1)
    }
    const decrementQuantity = ()=>{
        if (quantity > 1) {
            setQuantity(quantity - 1);
            removeItemFromCart(item); // Decrease quantity by 1
        } else {
            setIsSelected(false);
            removeItemFromCart(item); // Remove item from cart
        }
    }

    return(
        <View style={s.itemContainer}>
            <Image source={{ uri: item.image }} style={s.itemImage} />
            <View style={s.itemContent}>
                <Text style={s.itemTitle}>{item.title}</Text>
                <Text style={s.itemPrice}>Ksh {item.price}</Text>
                <Text style={s.itemDescription}>{item.description}</Text>
            </View>
            {isSelected ? (<View style={s.quantityContainer}>
                <TouchableOpacity style={s.button} onPress={()=> decrementQuantity()}>
                    <Text style={s.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={s.quantityText}>{quantity}</Text>
                <TouchableOpacity style={s.button} onPress={()=>incrementQuantity()}>
                    <Text style={s.buttonText}>+</Text>
                </TouchableOpacity>
            </View>):(<TouchableOpacity onPress={()=>handleSelectedItem()}>
                <Icon name="add-circle-outline" size={24} color="green" />
            </TouchableOpacity>)}

        </View>
    )


}
export default ProductItem