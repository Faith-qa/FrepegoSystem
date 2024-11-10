import {TouchableOpacity, Text, View, FlatList, ImageBackground} from "react-native";
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
            <Text style={s.tableCapacity}>{item.capacity} Person</Text>
            <Text style={s.tableNumber}>{item.number}</Text>
        </TouchableOpacity></Link>
    );

    return(
        <ImageBackground
            source={{uri: "https://images.unsplash.com/photo-1524947820859-81b71fe05edc?q=80&w=2833&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}} // Replace with the background image link
            style={s.background}>
        <View style={[s.container, {paddingTop:"50%"}]}>
            <FlatList
                data={data}
                renderItem={renderTable}
                numColumns={3}
                keyExtractor={(item) => item.id}
                columnWrapperStyle={s.row}
            />
        </View>
        </ImageBackground>
    )

}

export default TableSelectionScreen;