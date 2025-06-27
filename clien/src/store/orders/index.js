import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isloading: false,
    orderList: [],
}

export const addOrder = createAsyncThunk('/products/addOrder', async (formData) => {
    console.log('addOrder product api called')

    const result = await axios.post('https://fully-functional-e-commerce-website.onrender.com/api/orders', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    )
    return result?.data;
})
export const getUserOrdersder = createAsyncThunk('/products/getUserOrders', async (id) => {
    console.log('addOrder product api called')

    const result = await axios.get(`https://fully-functional-e-commerce-website.onrender.com/api/orders/my-orders/${id}`,
    )
    return result?.data;
})




const orderSlice = createSlice({

    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addOrder.pending, (state) => {
            console.log('addOrder clice called')
            state.isloading = true
        }).addCase(addOrder.fulfilled, (state, action) => {
            console.log('addOrder clice fulfilled')
            console.log(action.payload)
            state.isloading = false
            state.orderList = action.payload.orders
        }).addCase(addOrder.rejected, (state) => {
            console.log('addOrder clice rejected')
            state.isloading = false
            
        }).addCase(getUserOrdersder.pending, (state) => {
            console.log('getUserOrdersder clice pending')
            state.isloading = true
        }).addCase(getUserOrdersder.fulfilled, (state, action) => {
            console.log('getUserOrdersder clice fulfilled')
            console.log(action.payload.orders)
            state.isloading = false
            state.orderList = action.payload.orders

        }).addCase(getUserOrdersder.rejected, (state) => {
            console.log('getUserOrdersder clice rejected')
            state.isloading = false
            
        })

    }
}
)
export default orderSlice.reducer
