import {TouchableOpacity, Text, View, FlatList} from "react-native";
import s from './styles';
import { useNavigation } from '@react-navigation/native';
import {Link, router} from "expo-router";

interface NewProps{
    data: any
}
const TableSelectionScreen:React.FC<NewProps> = ({
    data
                                                 }) =>{
    const navigation = useNavigation();
    //onPress={/*() => navigation.navigate('Menu', { tableNumber: item.number })*/}
    //<Link href={{ pathname: "/Tables/MenuItems/", params: { tableNumber: item.number } }} asChild>

    const renderTable = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={s.tableContainer}
            onPress={()=> router.push('/Tables/MenuItems/')}
        >
            <Text style={s.tableCapacity}>{item.capacity}</Text>
            <Text style={s.tableNumber}>{item.number}</Text>
        </TouchableOpacity>
    );

    return(
        <View style={s.container}>
            <FlatList
                data={data}
                renderItem={renderTable}
                numColumns={3}
                keyExtractor={(item) => item.id}
                columnWrapperStyle={s.row}
            />
        </View>
    )

}

export default TableSelectionScreen;