import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Product } from "../../types/Product";
import axios, { AxiosError } from "axios";
import { NewProduct } from "../../types/NewProduct";


interface ProductReducer {
    loading: boolean
    error: string
    products: Product[]
}
const initialState: ProductReducer = {
    loading: false,
    error: "",
    products: []
}
export const fetchAllProducts = createAsyncThunk(
    "fetchAllProducts",
    async () => {
        try {
            const result = await axios.get<Product[]>("https://api.escuelajs.co/api/v1/products")
            return result.data
        } catch (e) {
            const error = e as AxiosError
            return error.message
        }
    }
)

export const createNewProduct = createAsyncThunk(
    "createNewProduct",
    async ({newProduct}:{newProduct: NewProduct}) => {
        try {
            console.log(newProduct);
            const result = await axios.post<Product>("https://api.escuelajs.co/api/v1/products/", newProduct)
            return result.data
            console.log(result.data);
        } catch (e) {
            const error = e as AxiosError
            if (error.response) {
                return JSON.stringify(error.response.data)
            }
            return error.message
        }
    }
)
const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        cleanUpProductReducer: (state) => {
            return initialState
        }

    }, // list of methods to modify the state,
    extraReducers: (build) => {
        build
            .addCase(fetchAllProducts.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false
                state.error = "Cannot perform this action. Please try again later"
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false
                if (typeof action.payload === "string") {
                    state.error = action.payload
                } else {
                    state.products = action.payload
                }
            })
            .addCase(createNewProduct.fulfilled, (state, action) => {
                if (typeof action.payload === "string") {
                    state.error = action.payload
                } else {
                    state.products.push(action.payload)
                }
                state.loading = false
            })
    }
})
const productsReducer = productsSlice.reducer
export const { cleanUpProductReducer } = productsSlice.actions
export default productsReducer