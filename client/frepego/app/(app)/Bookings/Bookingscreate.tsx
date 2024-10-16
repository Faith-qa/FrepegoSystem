import DatesUi from "@/componentsUi/BookingPage/datesUi";
import {View} from "react-native";
import CalendarUi from "@/componentsUi/BookingPage/calendarUi";
const Bookingscreate: React.FC = () =>{
    return(
        <View style={{padding: 5, }}>
        <DatesUi/>
        </View>
    )
}
export default Bookingscreate;