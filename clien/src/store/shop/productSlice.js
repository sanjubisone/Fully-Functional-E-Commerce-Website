import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isloading: false,
    productList: [],
}

export const fetchAllFilteredProduct = createAsyncThunk('/products/fetchAllFilteredProduct', async (filters) => {
console.log('fetchAllFilteredProduct product api called')
    const result = await axios.get('http://localhost:5000/api/shop/products/get', {
        params: filters 
      }
    )                 //  ('http://localhost:5000/api/admin/products/upload-image', data)
    console.log('fetchAllFilteredProduct product api called after')
    return result?.data;
})

const ShopProductSlice = createSlice({

    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

      builder.addCase(fetchAllFilteredProduct.pending, (state) => {
                  console.log('fetchAllFilteredProduct pending')
                  state.isloading = true
              }).addCase(fetchAllFilteredProduct.fulfilled, (state, action) => {
                  console.log('fetchAllFilteredProduct fulfilled')
                  console.log(action.payload)
                  state.isloading = false
                  state.productList = action.payload.data
              }).addCase(fetchAllFilteredProduct.rejected, (state) => {
                          console.log('fetchAllFilteredProduct rejected')
                          state.isloading = false
                          
                      })

    }
}
)

export default ShopProductSlice.reducer