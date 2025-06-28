import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formFields } from "@/config/index2";
import CommonForm from '../../components/common/form.jsx'
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "@/store/orders/index.js";
import { toast } from "sonner";

// Sample order prop (you will receive this from API)
export default function OrderList({ orders }) {
  const [selectedad, setselectedad] = useState(null);
 const [id , setId] = useState(null)
  const [formData, setFormData] = useState({
      paymentStatus: '',
      orderStatus : '',
      isDelivered: '',
      
    });
    
    console.log(formData)
    const dispatch = useDispatch()

    function onSubmit(event){
event.preventDefault()
console.log('event ',event)

dispatch(updateOrderStatus({id , formData})).then(data => {
            // console.log(data)
            if (data?.payload?.success) {
                toast(data?.payload?.message)
                console.log('form submitted successfully')
               window.location.reload();
            }
            else{
                          toast(data?.payload?.message)
                        }
        }

        )

    }

  return (
    <div className="grid gap-4">
      {orders?.map((order) => (
        <div key={order._id} className="border rounded-xl p-4 shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Order ID: {order._id.slice(-6)}</p>
              <p className="text-lg font-semibold">₹{order.totalAmount}</p>
              <p className="text-sm">Status: <span className="font-medium">{order.orderStatus}</span></p>
            </div>
        <div>

       
        <Dialog>
              <DialogTrigger asChild>
                <div>

              <Button onClick={()=>setId(order._id)} className=''>Update Status</Button>

                
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle >Update Order sattus</DialogTitle>
                </DialogHeader>
                            <CommonForm formControls={formFields} buttonText={'Update status'} formData={formData} setFormData={setFormData} onsubmit={onSubmit} />

            
              </DialogContent>
            </Dialog>


            <Dialog>
              <DialogTrigger asChild>
                <div>

                <Button
                  onClick={() => setselectedad(order)}
                  className="text-sm mt-4"
                >
                  View Details
                </Button>
                
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Order Details</DialogTitle>
                </DialogHeader>

                {selectedad && (
                  <div className="space-y-4 max-h-[70vh] overflow-auto">
                    <p><strong>User ID:</strong> {selectedad?.user?._id}</p>
                    <p><strong>Email:</strong> {selectedad?.user?.email}</p>
                    <p><strong>Payment Method:</strong> {selectedad?.paymentMethod}</p>
                    <p><strong>Payment Status:</strong> {selectedad?.paymentStatus}</p>
                    <p><strong>Shipping Address:</strong></p>
                    <div className="pl-4 text-sm">
                      <p>{selectedad.shippingAddress?.fullName}</p>
                      <p>{selectedad?.shippingAddress?.addressLine1}</p>
                      <p>{selectedad?.shippingAddress?.city}, {selectedad.shippingAddress.state} - {selectedad.shippingAddress.postalCode}</p>
                      <p>{selectedad.shippingAddress.country}</p>
                    </div>

                    <p className="pt-2 font-medium">Order Items:</p>
                    <ul className="space-y-2 text-sm">
                      {selectedad.orderItems.map((item, idx) => (
                        <li key={idx} className="flex items-center justify-between border p-2 rounded">
                          <div className="flex items-center gap-3">
                            <img src={item.image} alt={item.title} className="w-10 h-10 object-cover rounded" />
                            <div>
                              <p>{item.title}</p>
                              <p className="text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p>₹{item.price}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </DialogContent>
            </Dialog>
             </div>
          </div>
        </div>
      ))}
    </div>
  );
}
