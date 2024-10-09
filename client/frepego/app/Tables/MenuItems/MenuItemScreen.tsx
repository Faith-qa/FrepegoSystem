
import s from './styles'
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import { useRoute } from '@react-navigation/native';
import ProductItem from "@/app/Tables/MenuItems/Item";
import {CartItem} from "@/app/Tables/MenuItems/menuItemContainer";



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

    //const route = useRoute();
    //const { tableNumber } = route.params;


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
                <TouchableOpacity style={s.cartButton} onPress={() => alert('View Cart')}>
                    <Text style={s.cartText}>View Cart • KSh{getTotalPrice()}.00</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default MenuItemScreen;