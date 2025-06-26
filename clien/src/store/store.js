import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice/index.js";
import AdminProductSlice from './admin/product-slice/index.js'
import ShopProductSlice from './shop/productSlice.js'
import CartProductSlice from './cart/index.js'
import addressSlice from './address/index.js'
import orderSlice from './orders/index.js'

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminProducts : AdminProductSlice,
    shopProducts : ShopProductSlice,
    cartProducts : CartProductSlice,
    addresses :addressSlice,
    orders : orderSlice,

  },
});

export default store;
