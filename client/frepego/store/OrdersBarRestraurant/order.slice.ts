import {createSlice} from "@reduxjs/toolkit";


export const initialState = {
    cart: {
        menuItems:[{
            id:"",
            name:"",
            price:0,
            quantity: 0
        }],
        totalQuanity:0,
        totalPrice:0
    }

}

const checkoutSlice = createSlice({
    name:'checkout',
    initialState,
    reducers:{
        addItemToCart(state, action){
            const newItem = action.payload;
            const existingItem = state.cart.menuItems.find(item=> item.id === newItem)
            state.cart.totalQuanity++;
            state.cart.totalPrice += newItem.price
            if(!existingItem) {
                state.cart.menuItems.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: 1
                })
            } else {
                existingItem.quantity ++;
            }
        },
        removeItemFromCart(state, action){
            const id = action.payload;
            const existingItem = state.cart.menuItems.find(item => item.id === id);
            if (existingItem){
                state.cart.totalQuanity --;
                state.cart.totalPrice -= existingItem.price
                if (existingItem.quantity === 1) {
                    state.cart.menuItems = state.cart.menuItems.filter(item => item.id !== id);
                } else {
                    existingItem.quantity--;

            }
        }
        }
    },
    extraReducers:()=>{}

})

export const {addItemToCart,removeItemFromCart } = checkoutSlice.actions;
export default checkoutSlice.reducer