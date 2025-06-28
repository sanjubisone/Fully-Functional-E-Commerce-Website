import React, { useEffect } from 'react'
import {getAllOrders} from '@/store/orders/index'
import { useDispatch, useSelector } from 'react-redux'
import OrderList from './OrderList'


function AdminOrders() {
  const dispatch = useDispatch()
  useEffect(()=>{
   dispatch(getAllOrders()).then((data)=>{
  
   })
  },[dispatch])

 const { allorderList } = useSelector((state) => state.orders)
   console.log('displaying order list',allorderList )

  return (
    <div className="bg-white rounded-lg shadow p-6">
               <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
              <OrderList orders = {allorderList} />
             </div>
  )
}

export default AdminOrders
