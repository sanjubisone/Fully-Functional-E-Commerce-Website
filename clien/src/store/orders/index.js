import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isloading: false,
    orderList: [],
    allorderList: [],
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

export const updateOrderStatus = createAsyncThunk('/products/updateOrderStatus', async ({id,formData}) => {
    console.log('updateOrderStatus product api called')

    const result = await axios.put(`https://fully-functional-e-commerce-website.onrender.com/api/orders/${id}`,formData, {
        headers: {

            'Content-Type': 'application/json'
        }
    }
    )
    return result?.data;
})

export const getAllOrders = createAsyncThunk('/products/getAllOrders', async () => {
    console.log('getAllOrders product api called')

    const result = await axios.get(`https://fully-functional-e-commerce-website.onrender.com/api/orders`,
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
            
        }).addCase(updateOrderStatus.pending, (state) => {
            console.log('updateOrderStatus clice pending')
            state.isloading = true
        }).addCase(updateOrderStatus.fulfilled, (state, action) => {
            console.log('updateOrderStatus clice fulfilled')
            console.log(action.payload.orders)
            state.isloading = false
            state.allorderList = action.payload.orders

        }).addCase(updateOrderStatus.rejected, (state) => {
            console.log('updateOrderStatus clice rejected')
            state.isloading = false
            
        }).addCase(getAllOrders.pending, (state) => {
            console.log('getAllOrders clice pending')
            state.isloading = true
        }).addCase(getAllOrders.fulfilled, (state, action) => {
            console.log('getAllOrders clice fulfilled')
            console.log(action.payload.orders)
            state.isloading = false
            state.allorderList = action.payload.orders

        }).addCase(getAllOrders.rejected, (state) => {
            console.log('getUserOrdersder clice rejected')
            state.isloading = false
            
        })

    }
}
)
export default orderSlice.reducer
