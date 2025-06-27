import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isloading: false,
    cartproductList: [],
}


export const addToCart = createAsyncThunk('/products/addToCart', async (formData) => {
    console.log('addToCart product api called')

    const result = await axios.post('https://fully-functional-e-commerce-website.onrender.com/api/cart/items/add', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    )
    return result?.data;
})

export const fetchAllcartProduct = createAsyncThunk('/products/fetchAllcartProduct', async (userid) => {
console.log('fetchAllcartProduct product api called')
    const result = await axios.get(`https://fully-functional-e-commerce-website.onrender.com/api/cart/items/get/${userid}`,
    )                
    console.log('fetchAllcartProduct product api called after')
    return result?.data;
})

export const updateCartItemQty = createAsyncThunk('/products/updateCartItemQty', async (formData) => {
    console.log('updateCartItemQty product api called')

    const result = await axios.put('https://fully-functional-e-commerce-website.onrender.com/api/cart/items/edit', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    )
    return result?.data;
})

export const deleteCartItem = createAsyncThunk('/products/deleteCartItem', async (data) => {
    console.log('delete cart api called',data)

    const result = await axios.delete(`https://fully-functional-e-commerce-website.onrender.com/api/cart/items/delete`, {
        params: data 
      }
    )
    return result?.data;
})




const CartProductSlice = createSlice({

    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state) => {
            console.log('addToCart clice pending')
            state.isloading = true
        }).addCase(addToCart.fulfilled, (state, action) => {
            console.log('addToCart clice fulfilled')
            console.log(action.payload)
            state.isloading = false
            state.cartproductList = action.payload
        }).addCase(addToCart.rejected, (state) => {
            console.log('addToCart clice pending')
            state.isloading = false
            
        }).addCase(fetchAllcartProduct.pending, (state) => {
            console.log('fetchAllcartProduct clice pending')
            state.isloading = true
        }).addCase(fetchAllcartProduct.fulfilled, (state, action) => {
            console.log('fetchAllcartProduct clice fulfilled')
            console.log('this are your cart items',action.payload)
            state.isloading = false
            state.cartproductList = action.payload.data
        }).addCase(fetchAllcartProduct.rejected, (state) => {
            console.log('fetchAllcartProduct clice rejected')
            state.isloading = false
            
        }).addCase(updateCartItemQty.pending, (state) => {
            console.log('updateCartItemQtytProduct clice pending')
            state.isloading = true
        }).addCase(updateCartItemQty.fulfilled, (state, action) => {
            console.log('updateCartItemQty clice fulfilled')
            console.log('this are your cart updateCartItemQty',action.payload)
            state.isloading = false
            state.cartproductList = action.payload.data
        }).addCase(updateCartItemQty.rejected, (state) => {
            console.log('updateCartItemQty clice rejected')
            state.isloading = false
            
        }).addCase(deleteCartItem.pending, (state) => {
            console.log('deleteCartItem clice pending')
            state.isloading = true
        }).addCase(deleteCartItem.fulfilled, (state, action) => {
            console.log('deleteCartItem clice fulfilled')
            console.log('this are your cart updateCartItemQty',action.payload)
            state.isloading = false
            state.cartproductList = action.payload.data
        }).addCase(deleteCartItem.rejected, (state) => {
            console.log('deleteCartItem clice rejected')
            state.isloading = false
            
        })





    }
} )

export default CartProductSlice.reducer