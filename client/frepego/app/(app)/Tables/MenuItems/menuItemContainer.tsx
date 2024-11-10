import MenuItemScreen from "@/app/(app)/Tables/MenuItems/MenuItemScreen";
import {useEffect, useState} from "react";
import {gql, useQuery} from "@apollo/client";
import {useGlobalSearchParams} from "expo-router";
import {ActivityIndicator, ImageBackground} from "react-native";
import s from "@/app/(app)/Tables/styles";
export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface OrderItem {
    id: string;
    orderNumber: number;
    table_number: number;
    OrderItems: CartItem[];
    created_at: Date;
    totalCharge: number;

}
const MENU_ITEMS_QUERY = gql`
query {
    allMenuItems{
    id
    category
    title
    description
    image
    price
    }
    }
`
const MenuItemContainer: React.FC =() =>{
    const [cart, setCart] = useState<CartItem[]>([])
    const [orderCart, setOrderCart] = useState<OrderItem>()
    const {loading, error, data} = useQuery(MENU_ITEMS_QUERY)
    const [menuItems, setMenuItems] = useState([])

    const {tableNumber} = useGlobalSearchParams()
    const parsedTableNumber = Number(tableNumber)
    console.log("hello", tableNumber)

    useEffect(() => {
        if (data?.allMenuItems){
            setMenuItems(data.allMenuItems)

        }

    }, [data]);
    //add item to cart
    const addItemToCart = (item: CartItem, quantity: number) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + quantity }
                        : cartItem
                );
            }
            return [...prevCart, { ...item, quantity }];
        });
    };
// Decrement item quantity or remove from cart if quantity reaches 0
    const removeItemFromCart = (item: CartItem) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if(existingItem){
                if (existingItem.quantity === 1) {
                    return prevCart.filter(cartItem => cartItem.id !== item.id); // Remove from cart
                }
            }
            return prevCart.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            );
        });
    };
    // Calculate total price of items in the cart
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };



    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    // Use fetched data if available, otherwise fallback to mock data
   // const menuItems = data?.allMenuItems || [];

    /*TODO: PULL MENU ITEM DATA FROM DATABASE*/
    /*TODO: functionality for add menu item*/
    return(
        <MenuItemScreen  data={menuItems}  addItemToCart={addItemToCart} getTotalPrice={getTotalPrice} removeItemFromCart={removeItemFromCart} cart={cart} tableNumber={parsedTableNumber}/>
    )
}

export default MenuItemContainer;