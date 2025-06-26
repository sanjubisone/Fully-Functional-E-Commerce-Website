import { Button } from '@/components/ui/button'
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCartItemQty ,deleteCartItem ,} from '@/store/cart'
import { useNavigate } from 'react-router-dom'
import { toast } from "sonner"
function UserCartWrapper(cartItems) {

    const {user}=useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const [hoveredItemKey, setHoveredItemKey] = useState(null)

      function handlecart (id){
        const cartdata ={
       userId : user.id,
       productId  :id,
       quantity : 1,
      }


      
        dispatch(updateCartItemQty(cartdata))
        toast('cart  item quantity update successfully +1')

      }
      function handlecartmin (id){ 
        const cartdata ={
       userId : user.id,
       productId  :id,
       quantity : -1,
      }
        dispatch(updateCartItemQty(cartdata))
  toast('cart  item quantity update successfully -1')
      }

      function handledelete(id){
         console.log('here is deleted id ',id)
         dispatch(deleteCartItem({userId :user.id ,productId :id}))
          toast('cart  item delte succssfully ' )
      }

      const navigate = useNavigate()
      let Totalprice= 0;

     cartItems?.cartItems?.items?.forEach((item) => {
      Totalprice+=item.quantity * item.productId.price
      })

    return (
        <SheetContent className='sm:max-w-md pt-6 p-4'>
            <SheetHeader >
                <SheetTitle>Your Cart
                </SheetTitle>
            </SheetHeader>
            <div className='mt-8 space-y-4'>

            </div>
        <div className='mt-8 space-y-4 mr-4 ml-4 max-h-[50vh] overflow-auto'>


       
         {cartItems?.cartItems?.items?.map((item) => (
            
          <div 
              key={item.productId._id}
               onMouseEnter={() => setHoveredItemKey(item.productId._id)}
               onMouseLeave={() => setHoveredItemKey(null)}
          >
            <div
              className="flex items-center justify-between gap-4 border p-2 rounded-md"
            >
              <img
                src={item.productId.image}
                alt={item.productId.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{item.productId.title}</h4>
                <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                <p className="text-xs text-gray-600">₹{item.productId.price} each</p>
              </div>
             
              <div>
                <p className="font-medium text-sm">
                  ₹{item.quantity * item.productId.price}
                </p>
                
            <Button onClick = {()=>handlecart(item.productId._id)} className='mr-4 w-10 h-10 bg-gray-200 text-xl font-bold rounded hover:bg-gray-300 mt-4'>+</Button>
            <Button onClick = {()=>handlecartmin(item.productId._id)} className='w-10 h-10 bg-gray-200 text-xl font-bold rounded hover:bg-gray-300'>-</Button>
              </div>
              
             
            </div>
            {hoveredItemKey === item.productId._id && (
              <Button onClick = {()=>handledelete(item.productId._id)} className='mt-2 bg-red-500'>delete</Button> )}
            </div>
          ))}



            <div className='flex justify-between'>
                <span className='font-bold'>Total</span>
                <span className='font-bold'>${Totalprice}</span>

            </div>
        </div>
        <Button onClick = {()=>navigate('./checkout')} className='w-full mt-6'>Checkout</Button>

      
        </SheetContent>
    )
}

export default UserCartWrapper
