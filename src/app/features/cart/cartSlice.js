import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { addItems,deleteItem,changeQuantity,fetchItems } from "./cartApi";

let initialState={
    cartData : [],
    isLoading : false,
    error : false
}

export const fetchCartItemsAsync = createAsyncThunk(
    'cart/fetchCartItems',
    async ()=>{
        const response = await fetchItems()
        return response.data
    }
)

export const addCartItemsAsync = createAsyncThunk(
    'cart/addCartItems',
    async (item)=>{
        const response = await addItems(item)
        return response.data
    }
)

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCartItemsAsync.pending,(state)=> {
            state.isLoading=true
        })

        builder.addCase(fetchCartItemsAsync.fulfilled,(state,action)=>{
            state.cartData=action.payload
            state.isLoading=false
        })

        builder.addCase(addCartItemsAsync.fulfilled,(state,action)=>{
            state.cartData.push(action.payload)
            state.isLoading=false
        })

        builder.addCase(addCartItemsAsync.rejected,(state)=>{
            state.error=true
            state.isLoading=false
        })
    }
})

export default cartSlice.reducer

