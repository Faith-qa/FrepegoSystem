import DatesUi from "@/componentsUi/BookingPage/datesUi";
import {FlatList, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import CalendarUi from "@/componentsUi/BookingPage/calendarUi";
import s from "@/app/(app)/Tables/styles";
import {Link} from "expo-router";
import a from './styles';
interface NewProps{
    data:any[]
}
const Bookingscreate: React.FC<NewProps> = ({data}) =>{
    const renderTable = ({ item }: { item: any }) => (

            <TouchableOpacity
                style={[s.tableContainer,]}
                //onPress={()=> router.push('/Tables/MenuItems/')}
            >
                <Text style={s.tableNumber}>{item.roomType}</Text>
                <Text style={s.tableCapacity}>Ksh {item.price}</Text>
            </TouchableOpacity>
    );

    return(
        <ImageBackground
            source={{uri: "https://images.unsplash.com/photo-1524947820859-81b71fe05edc?q=80&w=2833&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}} // Replace with the background image link
            style={s.background}>

            <View style={[s.container, {paddingTop:"20%"}]}>
                {data.map(item=>(
                    <Link
                        key={item.roomType}
                        href={{ pathname: "/Bookings/BookingItems", params: { roomType: item.roomType } }}
                        asChild
                    >
                        <TouchableOpacity style={a.serviceCard}>
                            <Text style={s.tableNumber}>{item.roomType}</Text>
                            <Text style={s.tableCapacity}>Ksh {item.price}</Text>
                        </TouchableOpacity>
                    </Link>
                ))}
            </View>
        </ImageBackground>
    )
}
export default Bookingscreate;