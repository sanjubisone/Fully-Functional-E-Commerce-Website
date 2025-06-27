import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isloading: false,
    productList: [],
}

export const addNewProduct = createAsyncThunk('/products/addnewproduct', async (formData) => {
    console.log('addNewProduct product api called')

    const result = await axios.post('https://fully-functional-e-commerce-website.onrender.com/api/admin/products/add', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    )
    return result?.data;
})

export const fetchAllProduct = createAsyncThunk('/products/fetchAllProduct', async () => {
console.log('fetch all product api called')
    const result = await axios.get('https://fully-functional-e-commerce-website.onrender.com/api/admin/products/get'
    )                 //  ('https://fully-functional-e-commerce-website.onrender.com/api/admin/products/upload-image', data)
    console.log('fetch all product api called after')
    return result?.data;
})

export const editProduct = createAsyncThunk('/products/editProduct', async ({ id, formData }) => {

    const result = await axios.put(`https://fully-functional-e-commerce-website.onrender.com/api/admin/products/edit/${id}`, formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    )
    return result?.data;
})


export const deleteProduct = createAsyncThunk('/products/deleteProduct', async (id) => {

    const result = await axios.delete(`https://fully-functional-e-commerce-website.onrender.com/api/admin/products/delete/${id}`,
    )
    return result?.data;
})

const AdminProductSlice = createSlice({

    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllProduct.pending, (state) => {
            console.log('admin clice called')
            state.isloading = true
        }).addCase(fetchAllProduct.fulfilled, (state, action) => {
            console.log('admin clice called')
            console.log(action.payload)
            state.isloading = false
            state.productList = action.payload.data
        }).addCase(fetchAllProduct.rejected, (state) => {
            console.log('admin clice called')
            state.isloading = false
            
        }).addCase(addNewProduct.pending, (state) => {
            console.log('addNewProduct pending')
            state.isloading = true
        }).addCase(addNewProduct.fulfilled, (state, action) => {
            console.log('addNewProduct fullfilled')
            console.log(action.payload)
            state.isloading = false
            state.productList = action.payload
        }).addCase(addNewProduct.rejected, (state) => {
            console.log('admin clice called')
            state.isloading = false
            
        }).addCase(editProduct.pending, (state) => {
            console.log('editProduct pending')
            state.isloading = true
        }).addCase(editProduct.fulfilled, (state, action) => {
            console.log('editProduct fullfilled')
            console.log(action.payload)
            state.isloading = false
            state.productList = action.payload
        }).addCase(editProduct.rejected, (state) => {
            console.log('editProduct rejected')
            state.isloading = false
            
        }).addCase(deleteProduct.pending, (state) => {
            console.log('deleteProduct pending')
            state.isloading = true
        }).addCase(deleteProduct.fulfilled, (state, action) => {
            console.log('deleteProduct fullfilled')
            console.log(action.payload)
            state.isloading = false
            state.productList = action.payload
        }).addCase(deleteProduct.rejected, (state) => {
            console.log('deleteProduct rejected')
            state.isloading = false
            
        })


    }




})


export default AdminProductSlice.reducer