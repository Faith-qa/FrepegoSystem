import MenuItemScreen from "@/app/Tables/MenuItems/MenuItemScreen";
import {useState} from "react";
export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

const MenuItemContainer: React.FC =() =>{
    const [cart, setCart] = useState<CartItem[]>([])

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
    /*const openAdd = (id: any) =>{
        setSelectedItem(id)
        setOpenAddItemModal(true)
    }
    const closeAdd = () => {
        setSelectedItem(null)
        setOpenAddItemModal(false)
    }*/
    //handle cart



    const data = [
        {
            id: '1',
            title: 'Full American Breakfast',
            price: 650.00,
            description: 'Freshly squeezed juice, fruits cuts, toast served with butter and jam, breakfast cereals...',
            image: 'https://images.pexels.com/photos/103124/pexels-photo-103124.jpeg?auto=compress&cs=tinysrgb&w=1200', // Replace with actual image path or URL
        },
        {
            id: '2',
            title: 'Light Breakfast',
            price: 520.00,
            description: 'Freshly squeezed juice or fruit cuts, toast served with butter and jam and two eggs...',
            image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Replace with actual image path or URL
        },
        {
            id: '3',
            title: 'Continental Breakfast',
            price: 455.00,
            description: 'Freshly squeezed juice, fruit cuts, toast served with butter and jam or breakfast cereals...',
            image: 'https://images.pexels.com/photos/414555/pexels-photo-414555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Replace with actual image path or URL
        },
        {
            id: '4',
            title: 'Two eggs, 2 sausages',
            price: 325.00,
            description: 'Served with toast...',
            image: 'https://images.pexels.com/photos/101533/pexels-photo-101533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Replace with actual image path or URL
        },
    ];
    
    

    /*TODO: PULL MENU ITEM DATA FROM DATABASE*/
    /*TODO: functionality for add menu item*/
    return(
        <MenuItemScreen  data={data}  addItemToCart={addItemToCart} getTotalPrice={getTotalPrice} removeItemFromCart={removeItemFromCart} cart={cart}/>
    )
}

export default MenuItemContainer;