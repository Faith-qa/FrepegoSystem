
import s from './styles'
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import { useRoute } from '@react-navigation/native';
import AddItemCont from "@/app/Tables/MenuItems/AddItem";
import ProductItem from "@/app/Tables/MenuItems/Item";


interface NewProps {
    selectedItem:any,
    data: any,
    openAddItem: boolean,
    setOpenAddItem: (id:any)=> void,
    closeAddItem: ()=>void
}
const MenuItemScreen: React.FC<NewProps> = (
    {
        data,
        openAddItem,
        closeAddItem,
        setOpenAddItem,
        selectedItem
    }
)=>{

    //const route = useRoute();
    //const { tableNumber } = route.params;

    const MenuItem = ({item}: {item: any}) => (
        <View style={s.itemContainer}>
            <Image source={{ uri: item.image }} style={s.itemImage} />
            <View style={s.itemContent}>
                <Text style={s.itemTitle}>{item.title}</Text>
                <Text style={s.itemPrice}>{item.price}</Text>
                <Text style={s.itemDescription}>{item.description}</Text>
            </View>
            {selectedItem === item.id ? <AddItemCont open={openAddItem} closeI={closeAddItem}/>:
            <TouchableOpacity onPress={()=>setOpenAddItem(item.id)}>
                <Icon name="add-circle-outline" size={24} color="green" />
            </TouchableOpacity>}
        </View>

    )
    return(
        <View style={s.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <ProductItem item={item}/>
                )}
                keyExtractor={(item) => item.id}
            />

        </View>
    )
}

export default MenuItemScreen;