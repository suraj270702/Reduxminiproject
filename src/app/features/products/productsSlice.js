import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "./productsApi";

let initialState = {
    productsData : [],
    status : 'idle'
}


export const fetchAsync = createAsyncThunk(
    'products/fetchProducts',
    async () =>{
        const response = await fetchProducts()
        return response.data
    }
)


export const productsSlice = createSlice({
    name : "products",
    initialState,
    reducers : {

    },
    extraReducers : (builder)=>{

        builder.addCase(fetchAsync.pending,(state)=>{
            state.status='loading'
        })

        builder.addCase(fetchAsync.fulfilled,(state,action)=>{
            state.status="idle"
            state.productsData = action.payload
        })

    }
})

export default productsSlice.reducer