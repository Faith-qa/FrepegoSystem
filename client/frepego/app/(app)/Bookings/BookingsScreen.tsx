import DatesUi from "@/componentsUi/BookingPage/datesUi";
import {View} from "react-native";
const BookingsScreen: React.FC = () =>{
    return(
        <View style={{padding: 5, }}>
        <DatesUi/>
        </View>
    )
}
export default BookingsScreen;