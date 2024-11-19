import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {PENDING_BOOKINGS, PENDING_ORDERS_QUERY} from "@/app/graph_queries";



//define the type for context value
interface CartContextType {
    bookingCart: any[];
    addToBookingCart: (item:any)=>void;
    removeFromBookingCart: (itemid:string)=> void;
    bookingsLoading: boolean;
    orderCart: any[];
    ordersLoading: boolean;
    addToOrderCart:(item:any)=>void;
    removeFromOrderCart:(itemid:string)=>void;
}

//Define the type for the cartProviders
interface CartProviderProps{
    children: ReactNode;
}
const CartContext = createContext<CartContextType|undefined>(undefined);

export const CartProvider:React.FC<CartProviderProps> = ({children})=>{
    const [bookingCart, setBookingCart] = useState<any[]>([])
    const[orderCart, setOrderCart]=useState<any[]>([])

    //fetch pending data
    const {data:bookingData, loading: bookingsLoading, error: bookingsError} = useQuery(PENDING_BOOKINGS)
    const {data: orderData, loading: ordersLoading, error:ordersError}= useQuery(PENDING_ORDERS_QUERY)


    useEffect(() => {
        if(bookingData){
            setBookingCart(bookingData.bookingsPendingCheckout)
        }
    }, [bookingData]);


    useEffect(() => {
        if(orderData){
            setOrderCart(orderData.pendingOrders)
        }
    }, [orderData]);
    //Booking Cart Methods

    const addToBookingCart = (item:any)=>{
        setBookingCart((prevCart)=>[...prevCart, item]);
    }

    const removeFromBookingCart = (itemId: string) => {
        setBookingCart((prevCart)=>prevCart.filter((item)=> item.id !== itemId));
    }
    //Orders Cart methods

    const addToOrderCart = (item: any) =>{
        setOrderCart((prevCart)=>[...prevCart, item])
    }

    const removeFromOrderCart = (itemId:string)=>{
        setOrderCart((prevCart)=>prevCart.filter((item)=>item.id !== itemId))
    }
    //provide context value

    const value: CartContextType = {
        bookingCart,
        addToBookingCart,
        removeFromBookingCart,
        bookingsLoading,
        orderCart,
        ordersLoading,
        addToOrderCart,
        removeFromOrderCart
    };

    return(<CartContext.Provider value={value}>{children}</CartContext.Provider> )
}

//custom hook to use the cart context
export const useCart = ():CartContextType => {
    const context = useContext(CartContext)
    if(!context){
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};