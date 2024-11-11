import BookingItemScreen from "@/app/(app)/Bookings/BookingItems/BookingItemScreen";

const BookingItemContainer:React.FC = () => {

    const sampledata = [
        {"id": "1", "name": "LION","price":2000, "description": "A cozy space with a queen-size bed, free Wi-Fi, flat-screen TV, and essential amenities for a comfortable stay.", "image": "https://images.unsplash.com/photo-1445991842772-097fea258e7b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
        {"id": "2", "name": "JAGUAR ","price": 2500, "description": "A cozy space with a queen-size bed, free Wi-Fi, flat-screen TV, and essential amenities for a comfortable stay.", "image": "https://images.unsplash.com/photo-1445991842772-097fea258e7b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
        {"id": "3", "name": "IMPALA", "price": 3000,"description": "A cozy space with a queen-size bed, free Wi-Fi, flat-screen TV, and essential amenities for a comfortable stay.", "image": "https://images.unsplash.com/photo-1445991842772-097fea258e7b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},


    ]


    return(
        <BookingItemScreen data={sampledata}/>
    )
}

export default BookingItemContainer;