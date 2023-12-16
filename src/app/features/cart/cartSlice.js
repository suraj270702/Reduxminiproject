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
        const {id,title,brand,price,images} = item
        const response = await addItems({id,title,brand,price,images,quantity:1})
        return response.data
    }
)

export const deleteCartItemsAsync = createAsyncThunk(
    'cart/deleteCartItems',
    async (id)=>{
        
        const response = await deleteItem(id)
        return id
    }
)

export const updateCartItemsAsync = createAsyncThunk(
    'cart/updateCartItems',
    async ({id,qty})=>{
        
        const response = await changeQuantity(id,qty)
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
        }),
        builder.addCase(deleteCartItemsAsync.fulfilled,(state,action)=>{
            const index = state.cartData.findIndex((item)=>item.id===action.payload)

            state.cartData.splice(index,1)

            state.error=false
            state.isLoading=false
        }),
        builder.addCase(updateCartItemsAsync.fulfilled,(state,action)=>{
            const index = state.cartData.findIndex((item)=>item.id===action.payload.id)

            state.cartData.splice(index,1,action.payload)

            state.error=false
            state.isLoading=false
        })
    }
})

export default cartSlice.reducer

