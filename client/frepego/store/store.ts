import {configureStore,combineReducers} from "@reduxjs/toolkit";
import checkoutReducers from '../store/OrdersBarRestraurant/order.slice'
const rootReducer = combineReducers(
    {
        checkout: checkoutReducers
    }
)
export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;