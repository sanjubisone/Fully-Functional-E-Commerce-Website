import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import Login from './pages/auth/login'
import Register from './pages/auth/register'

import './App.css'
import AdminLayout from './components/admin-view/layout'
import AdminDashboard from './components/admin-view/dashboard'
import AdminFeatures from './components/admin-view/features'
import AdminOrders from './components/admin-view/orders'
import AdminProducts from './components/admin-view/products'
import ShoppingLayout from './pages/shopping-view/layout'
import NotFound from './NotFound'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingListing from './pages/shopping-view/listing'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingAccount from './pages/shopping-view/account'
import CheckAuth from './components/common/check-auth'
import CommonForm from './components/common/form'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/auth-slice'
import { Skeleton } from "@/components/ui/skeleton"


function App() {
 

  const {isAuthenticated,user,isLoading}=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  useEffect (()=>{
    dispatch(checkAuth())
  },[dispatch])

  if(isLoading){ return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )}

  console.log('isAuthenticated : ',isAuthenticated ,'user ',user ,'isLoading :', isLoading )

  return (
    <>
    
      <div>
        
        {/* <CommonForm /> */}
        
        <Routes>
          <Route path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
            </CheckAuth>} >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
          <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout /></CheckAuth>} >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="features" element={<AdminFeatures />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
          </Route>

          <Route path="shop" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><ShoppingLayout /></CheckAuth>} >
            <Route path="home" element={<ShoppingHome />} />
            <Route path="listing" element={<ShoppingListing />} />
            <Route path="checkout" element={<ShoppingCheckout />} />
            <Route path="account" element={<ShoppingAccount />} />
          </Route>
           {/* <Route path="*" element={<NotFound />} /> */}

        </Routes>
      </div>
    </>
  )
}

export default App
