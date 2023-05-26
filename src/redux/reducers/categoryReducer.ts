import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import  {Category}  from "../../types/Category";
import {Product} from "../../types/Product";


const initialState: {
    category: Category,
    categories: Category[],
    products: Product[],
    loading: boolean,
    error: string
} = {
    categories: [],
    products: [],
    category: {
        id: 0,
        name: '',
        image: ''
    },
    loading: false,
    error: ""
}
export const fetchAllCategories = createAsyncThunk(
    'fetchAllCategories',
    async () => {
      try {
        const result = await axios.get<Category[]>("https://api.escuelajs.co/api/v1/categories");
        return result.data
      } catch (e) {
        const error = e as AxiosError;
        return error;
      }
    }
);
export const fetchACategory = createAsyncThunk(
    'fetchACategory',
    async ({ categoryId}: { categoryId: number }) => {
      try {
        const result = await axios.get<Category>(`https://api.escuelajs.co/api/v1/categories/${categoryId}`);
        return result.data
      } catch (e) {
        const error = e as AxiosError;
        return error;
      }
    }
)


const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
    } ,
    extraReducers: (build) => {
        build
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.categories = action.payload;
                    
                }
                state.loading = false
            })
            .addCase(fetchAllCategories.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.error = "Couldn't fetch data"
            })
            .addCase(fetchACategory.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.category = action.payload; 
                }
                state.loading = false
            })
            .addCase(fetchACategory.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchACategory.rejected, (state, action) => {
                state.error = "Couldn't fetch data"
            })
    }
})

const categoryDetails = categoriesSlice.reducer
export default categoryDetails