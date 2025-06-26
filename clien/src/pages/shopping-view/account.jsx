import React, { useEffect, useState } from 'react';
import { User, Truck, Heart, MapPin, LogOut } from 'lucide-react';
import { Plus } from "lucide-react"; 
import { Button } from "@/components/ui/button"
import {addAddress ,getAllAddresses} from '@/store/address/index.js'
import {getUserOrdersder} from '@/store/orders/index'
import AddressCard from './address-card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import CommonForm from '../../components/common/form.jsx'
import {addressFormElements} from '@/config/index.js'
import { useDispatch ,useSelector} from 'react-redux';
import { toast } from "sonner"
import OrderList from './OrderList'


function ShoppingAccount() {


   const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    isDefault: false,
  });
  
 

  const dispatch = useDispatch();
    const {user}=useSelector(state=>state.auth)
    
    
     
useEffect(()=>{
 dispatch(getUserOrdersder(user.id)).then((data)=>{

 })
},[dispatch])

useEffect(()=>{
  dispatch(getAllAddresses(user.id)).then((data)=>{
  

  })
},[dispatch])

    const { orderList } = useSelector((state) => state.orders)
   console.log('displaying order list',orderList )

 

  const {addressList}=useSelector(state=>state.addresses)

    // console.log('all lista ',addressList)

  // console.log('account user',user)
 const needata ={...formData ,userId : user.id}
  function onSubmit(event){
     event.preventDefault()
        dispatch(addAddress(needata)).then(data => {
            // console.log(data)
            if (data?.payload?.success) {
                toast(data?.payload?.message)
            }
            else{
                          toast(data?.payload?.message)
                        }
        }

        )

  }
  
  // console.log('account formdata',needata)

const [editingAddress,setEditingAddress]=useState(null);

function handleDelete(id){

// console.log('you click on address delete button')
}




  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

 <div className='md:flex gap-4 mb-4'>
    {addressList.map((addr) => (
  <AddressCard
    key={addr._id}
    address={addr}
    onEdit={(data) => setEditingAddress(data)}
    onDelete={(id) => handleDelete(id)}
  />
))}</div>

         <Dialog>
      <DialogTrigger asChild>
          <Button className="flex items-center gap-2 mb-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded">
  <Plus size={18} />
  Add Address
</Button>

      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add your Address</DialogTitle>
          <DialogDescription>
            this is your address whre your delevery come.
          </DialogDescription>
        </DialogHeader>
          <div className='h-[70vh] overflow-auto'>
            {/* {confirm('do you want to oprn dialog') ?'you click yes' :'you click no'} */}

              <CommonForm formControls={addressFormElements} buttonText={'Add address'} formData={formData} setFormData={setFormData} onsubmit={onSubmit} />
          </div>
      </DialogContent>
    </Dialog>

  

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       
        {/* Left Sidebar */}
        <div className="bg-white rounded-lg shadow p-4 space-y-4">
          <div className="flex items-center gap-3">
            <User className="w-8 h-8 text-blue-600" />
            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-gray-500">john@example.com</p>
            </div>
          </div>

          <hr />

          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2  hover:text-blue-600 cursor-pointer">
              <User className="w-4 h-4" /> Profile
            </li>
            <li className="flex items-center gap-2  text-blue-600 font-medium">
              <Truck className="w-4 h-4" /> Orders
            </li>
            <li className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
              <Heart className="w-4 h-4" /> Wishlist
            </li>
            <li className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
              <MapPin className="w-4 h-4" /> Addresses
            </li>
            <li className="flex items-center gap-2 text-red-500 hover:text-red-600 cursor-pointer">
              <LogOut className="w-4 h-4" /> Logout
            </li>
          </ul>
        </div>

        {/* Right Panel */}
        <div className="md:col-span-2 space-y-6">

          {/* Orders Preview */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
           <OrderList orders = {orderList} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingAccount
