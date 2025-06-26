import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const initialState = {
    isloading: true,
    addressList: [],
}

export const addAddress = createAsyncThunk('/products/addAddress', async (formData) => {
    console.log('addAddress product api called')

    const result = await axios.post('http://localhost:5000/api/address/add', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    )
    return result?.data;
})


export const getAllAddresses = createAsyncThunk('/products/getAllAddresses', async (userid) => {
console.log('getAllAddresses product api called')
    const result = await axios.get(`http://localhost:5000/api/address/get/${userid}`,
    )                
    console.log('getAllAddresses product api called after')
    return result?.data;
})




const addressSlice = createSlice({

    name: 'addresses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addAddress.pending, (state) => {
            console.log('addAddress clice called')
            state.isloading = true
        }).addCase(addAddress.fulfilled, (state, action) => {
            console.log('addAddress clice fulfilled')
            console.log(action.payload)
            state.isloading = false
            state.addressList = action.payload.data
        }).addCase(addAddress.rejected, (state) => {
            console.log('addAddress clice rejected')
            state.isloading = false
            
        }).addCase(getAllAddresses.pending, (state) => {
            console.log('getAllAddresses clice called')
            state.isloading = true
        }).addCase(getAllAddresses.fulfilled, (state, action) => {
            console.log('getAllAddresses clice fulfilled')
            console.log(action.payload)
            state.isloading = false
            state.addressList = action.payload.addresses
        }).addCase(getAllAddresses.rejected, (state) => {
            console.log('getAllAddresses clice rejected')
            state.isloading = false
            
        })
    }
})

export default addressSlice.reducer;