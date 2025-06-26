import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {addOrder} from '@/store/orders/index'
import PayNow from '@/components/PayNow';
import {getAllAddresses} from '@/store/address/index.js'
import { FaCcPaypal, FaCreditCard, FaMoneyBillWave, FaUniversity } from 'react-icons/fa';
import DialogComp from './dialog-comp'
import { fetchAllcartProduct } from '@/store/cart'
import { useNavigate } from 'react-router-dom';
const paymentOptions = [
  {
    id: 'razorpay',
    name: 'Razorpay',
    icon: <FaCreditCard size={24} />,
  },
 
  {
    id: 'CashOnDelivery',
    name: 'Cash on Delivery',
    icon: <FaMoneyBillWave size={24} />,
  },
];


 
function ShoppingCheckout() {
 
   const [selected, setSelected] = useState('');
  // const [ address, setaddress]=useState([])
  const handleSelect = (methodId) => {
    setSelected(methodId);
  
  };



  const { cartproductList } = useSelector((state) => state.cartProducts)
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAllAddresses(user.id)).then(()=>{
     
    })
  },[])
   useEffect(()=>{
    dispatch(fetchAllcartProduct(user.id))
   },[dispatch])
  const {isloading, addressList } = useSelector((state) => state.addresses);
    
  // console.log('address',addressList)
  // console.log('isloading ',isloading)

    // (addressList?.length===0 && isloading===false) ? alert('address is empgty') : alert('address are awailable');
  
 
  
  
  
  console.log('ShoppingCheckout' ,cartproductList.items)

  //  const cartItems = {productId : cartproductList.items._id,title :cartproductList.items.title ,price :cartproductList.items.price ,image : cartproductList.items.image }
   const cartItems=cartproductList.items

  const address = addressList? addressList[0] : [];


  


    let Totalprice= 0;

     cartItems?.forEach((item) => {
      Totalprice+=item.quantity * item.productId.salePrice
      })

  const ordermodel =[];
  cartItems?.map((item)=>{
    ordermodel.push({productId : item.productId._id ,title:item.productId.title , price : item.productId.price , image : item.productId.image ,quantity :item.quantity})

  })

  console.log('this is your order model ',ordermodel);

  const navigate = useNavigate()

  function handleOrder(){

   
    
    dispatch(addOrder({orderItems : ordermodel ,shippingAddress : address , paymentMethod :selected,totalAmount :Totalprice ,user:user.id})).then(()=>navigate('/shop/account'))
  }

  
function onSuccess (){
      dispatch(addOrder({orderItems : ordermodel ,shippingAddress : address , paymentMethod :selected,totalAmount :Totalprice ,user:user.id})).then(()=>navigate('/shop/account'))

  console.log('your payment completed succefully')
}
  

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      {
      (addressList?.length===0 && isloading===false) ?<DialogComp length={addressList.length}/>:null

      }
      

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Side: Address & Payment */}
        <div className="md:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="border p-4 rounded-lg bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
            <p>{address?.fullName}</p>
            <p>{address?.phoneNumber}</p>
            <p>{address?.addressLine1}, {address?.city}</p>
            <p>{address?.state} - {address?.postalCode}, {address?.country}</p>
            <button className="mt-2 text-sm text-blue-600 hover:underline">Change Address</button>
          </div>

          {/* Payment Method */}
           <h1 className='m-2'>Select a Payment Option</h1>
          
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
         
      {paymentOptions.map((method) => (
        <div
          key={method.id}
          onClick={() => handleSelect(method.id)}
          className={`cursor-pointer flex items-center gap-4 p-4 border rounded-2xl shadow-sm transition ${
            selected === method.id
              ? 'border-blue-500 bg-blue-50'
              : 'hover:border-gray-400'
          }`}
        >
          <div className="text-blue-600">{method.icon}</div>
          <span className="text-base font-medium">{method.name}</span>
        </div>
      ))}
    </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="border p-4 rounded-lg bg-white shadow-md">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

          {cartItems?.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img src={item.productId.image} alt={item.productId.title} className="w-12 h-12 rounded" />
                <div>
                  <p className="font-medium">{item.productId.title}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold">₹{item.productId.salePrice * item.quantity}</p>
            </div>
          ))}

          <hr className="my-4" />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>₹{Totalprice}</span>
          </div>

        {selected === 'CashOnDelivery' && (
          <button onClick={handleOrder} className="mt-6 w-full mb-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Place Order
          </button>
        )}
        {selected === 'razorpay' && (

            <PayNow amount={Totalprice} user={user} onSuccess={onSuccess} />

        )}

        </div>
      </div>
    </div>
  )
}

export default ShoppingCheckout
