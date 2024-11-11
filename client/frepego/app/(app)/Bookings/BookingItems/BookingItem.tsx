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

    return(
        <View>
        <TouchableOpacity style={s.itemContainer} onPress={()=>setOpenBookingForm(true)}>
            <Image source={{ uri: item.image }} style={s.itemImage} />
            <View style={s.itemContent}>
                <Text style={s.itemTitle}>{item.name}</Text>
                <Text style={s.itemPrice}>Ksh {item.price}</Text>
                <Text style={s.itemDescription}>{item.description}</Text>
            </View></TouchableOpacity>
            <BookingForm roomDetails={item} openBookingForm={openBookingForm} closeBookingForm={closeForm}/>
        </View>
    )
}

export default BookingItem;