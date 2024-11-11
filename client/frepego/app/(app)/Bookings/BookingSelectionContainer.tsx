import Bookingscreate from "@/app/(app)/Bookings/Bookingscreate";


const BookingSelectionContainer:React.FC = () => {

    const sampledata = [
    { id: '1', roomType: "STANDARD", price: 2000 },
    { id: '2', roomType: "DELUXE", price: 2500 },
    { id: '3', roomType: "SUPER_DELUXE", price: 3000 },
    ]
    return(
        <Bookingscreate data={sampledata}/>
    )
}

export default BookingSelectionContainer;