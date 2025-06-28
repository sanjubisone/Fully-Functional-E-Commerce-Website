import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Sample order prop (you will receive this from API)
export default function OrderList({ orders }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

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
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={() => setSelectedOrder(order)}
                  className="text-sm"
                >
                  View Details
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Order Details</DialogTitle>
                </DialogHeader>

                {selectedOrder && (
                  <div className="space-y-4 max-h-[70vh] overflow-auto">
                    <p><strong>User ID:</strong> {selectedOrder?.user?._id}</p>
                    <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                    <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
                    <p><strong>Shipping Address:</strong></p>
                    <div className="pl-4 text-sm">
                      <p>{selectedOrder.shippingAddress.fullName}</p>
                      <p>{selectedOrder.shippingAddress.addressLine1}</p>
                      <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.postalCode}</p>
                      <p>{selectedOrder.shippingAddress.country}</p>
                    </div>

                    <p className="pt-2 font-medium">Order Items:</p>
                    <ul className="space-y-2 text-sm">
                      {selectedOrder.orderItems.map((item, idx) => (
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
      ))}
    </div>
  );
}
