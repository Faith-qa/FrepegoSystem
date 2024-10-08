import React, {useState} from "react";
import {Button, Image, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import s from './styles'


const ProductItem = ({item}: {item: any}) => {
    const [isSelected, setIsSelected] = useState(false)
    const [quantity, setQuantity] = useState(0)

    const handleSelectedItem = () => {
        setIsSelected(true)
        setQuantity(1)
    }

    const incrementQuantity = () => setQuantity( quantity + 1)
    const decrementQuantity = ()=>{
        if(quantity > 1) setQuantity(quantity -1)
        else setIsSelected(false)
    }

    return(
        <View style={s.itemContainer}>
            <Image source={{ uri: item.image }} style={s.itemImage} />
            <View style={s.itemContent}>
                <Text style={s.itemTitle}>{item.title}</Text>
                <Text style={s.itemPrice}>{item.price}</Text>
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