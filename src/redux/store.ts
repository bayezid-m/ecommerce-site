import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productReducer";

const store = configureStore({
    reducer: {
        productsReducer,
        // usersReducer,
        // favReducer
    },
    preloadedState: {
        productsReducer: {
            loading: false,
            error: "",
            products: []
        },   
       // favReducer: favData
    }
})
// store.subscribe(() => {
//     localStorage.setItem("fav", JSON.stringify(store.getState().favReducer))
// })

export type GlobalState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 
export default store