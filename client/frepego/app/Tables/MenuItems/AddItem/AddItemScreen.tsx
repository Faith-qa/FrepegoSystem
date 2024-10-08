import {View, TouchableOpacity, Text} from "react-native";
import s from './styles'
import React from "react";
interface NewProps {
    quantity: number;
    increment: () => void;
    decrement: () => void;
}
const AddItemScreen: React.FC<NewProps> = ({
    quantity,
    increment,
    decrement
                                           }


) => {

    return(
        <View style={s.container}>
            <TouchableOpacity style={s.button} onPress={()=> decrement()}>
                <Text style={s.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={s.quantityText}>{quantity}</Text>
            <TouchableOpacity style={s.button} onPress={()=>increment()}>
                <Text style={s.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    )

}

export default AddItemScreen;