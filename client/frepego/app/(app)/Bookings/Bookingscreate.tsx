import DatesUi from "@/componentsUi/BookingPage/datesUi";
import {ImageBackground, View} from "react-native";
import CalendarUi from "@/componentsUi/BookingPage/calendarUi";
import s from "@/app/(app)/Tables/styles";
const Bookingscreate: React.FC = () =>{
    return(
        <ImageBackground
            source={{uri: "https://images.unsplash.com/photo-1524947820859-81b71fe05edc?q=80&w=2833&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}} // Replace with the background image link
            style={s.background}>
        <DatesUi/>
        </ImageBackground>
    )
}
export default Bookingscreate;