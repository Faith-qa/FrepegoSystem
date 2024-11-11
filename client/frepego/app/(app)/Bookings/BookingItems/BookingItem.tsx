import s from "@/app/(app)/Tables/MenuItems/styles";
import {Image, Text, Touchable, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import BookingForm from "@/app/(app)/Bookings/BookingItems/bookingFormModal";


interface NewProps{
    item:any
}
const BookingItem:React.FC<NewProps> = ({item})=>{
    const [openBookingForm, setOpenBookingForm] = useState(false)

    const closeForm = () => {
        setOpenBookingForm(false)
    }
    const imaage = "https://images.unsplash.com/photo-1445991842772-097fea258e7b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

    return(
        <View>
        <TouchableOpacity style={s.itemContainer} onPress={()=>setOpenBookingForm(true)}>
            <Image source={{ uri: imaage }} style={s.itemImage} />
            <View style={s.itemContent}>
                <Text style={s.itemTitle}>{item.roomNumber}</Text>
                <Text style={s.itemPrice}>Ksh {item.roomType.pricePerNight}</Text>
                <Text style={s.itemDescription}>{item.roomType.description}</Text>
            </View></TouchableOpacity>
            <BookingForm roomDetails={item} openBookingForm={openBookingForm} closeBookingForm={closeForm}/>
        </View>
    )
}

export default BookingItem;