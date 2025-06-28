import axios from 'axios';

const PayNow = ({ amount, user, onSuccess }) => {
  console.log('pay now function run')
  const handlePayment = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/payment/create-order', { amount },);
      console.log('payment data ',data)
      const options = {
        key: "rzp_test_J5rMjNXVEGBegc", // Only key_id, not secret
        amount: data.order.amount,
        currency: "INR",
        name: "sanju bisone",
        description: "Test Transaction",
        image: "https://your-logo-url.png",
        order_id: data.order.id,
        handler: function (response) {
          console.log(response);
          // optionally verify payment on backend
          onSuccess(response);
        },
        prefill: {
          name: user?.title,
          email: user?.email,
          contact: user?.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error('Error during payment initiation:', error);
      // You might want to show a user-friendly message here
    }
  };

  return <button onClick={handlePayment} className="mt-6 w-full mb-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Pay Now</button>;
};

export default PayNow;
