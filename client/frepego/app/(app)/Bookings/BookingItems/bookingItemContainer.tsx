import BookingItemScreen from "@/app/(app)/Bookings/BookingItems/BookingItemScreen";
import {useQuery} from "@apollo/client";
import {AVAILABLE_ROOMS} from "@/app/graph_queries";
import {useEffect, useState} from "react";
import {useGlobalSearchParams} from "expo-router";
import {ActivityIndicator} from "react-native";

const BookingItemContainer:React.FC = () => {

    const [rooms, setRooms] = useState<any[]>([])

    const {roomType} = useGlobalSearchParams()
    console.log("hello", roomType)

    const {loading, error, data} = useQuery(AVAILABLE_ROOMS,{
        variables:{roomType}
    })
    //remove bookedRooms
    const removeFromAvailableRooms = (itemId: string) => {
        setRooms((prevCart)=>prevCart.filter((item)=> item.id !== itemId));
    }

    useEffect(() => {
        if(data?.availableRooms) {
            setRooms(data.availableRooms)

        }

    }, [data]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }




    return(
        <BookingItemScreen data={rooms} removeFromAvailableRooms={removeFromAvailableRooms}/>
    )
}

export default BookingItemContainer;