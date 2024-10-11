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

    const renderTable = ({ item }: { item: any }) => (
        <Link href={{ pathname: "/Tables/MenuItems/", params: { tableNumber: item.number } }} asChild>

        <TouchableOpacity
            style={s.tableContainer}
            //onPress={()=> router.push('/Tables/MenuItems/')}
        >
            <Text style={s.tableCapacity}>{item.capacity}</Text>
            <Text style={s.tableNumber}>{item.number}</Text>
        </TouchableOpacity></Link>
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