export const LoginFormcontrol = [
   
    {
        name: "email",
        type: "email",
        placeholder: "enter email",
        required: true,
        label: "Email",
        componenttype: "input",
    },
    {
        name: "password",
        type: "password",
        placeholder: "enter password",
        required: true,
        label: "Password",
        componenttype: "input",
    },
   
]
export const formFields = [
 
  {
    label: "Order Status",
    name: "orderStatus",
    component: "select",
    componenttype: "select",
    placeholder: "Select order status",
    options: [
      { label: "Processing", value: "Processing" },
    
      { label: "Shipped", value: "Shipped" },
      { label: "Delivered", value: "Delivered" },
      { label: "Cancelled", value: "Cancelled" },
    ],
  },
  {
    label: "Payment Status",
    name: "paymentStatus",
    component: "select",
    componenttype: "select",
    placeholder: "Select payment status",
    options: [
      { label: "Pending", value: "Pending" },
      { label: "Paid", value: "Paid" },
      { label: "Failed", value: "Failed" },
  
    ],
  },
  {
    label: "Is Delivered",
    name: "isDelivered",
    component: "select",
    componenttype: "select",
    placeholder: "Select delivery status",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
  }
];


