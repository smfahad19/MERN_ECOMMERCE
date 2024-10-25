import { useEffect } from "react";
import { Button } from "@/components/ui/button";

function Payment({ totalAmount, closePayment }) {
  useEffect(() => {
    // Simulate loading or payment API logic here
    console.log("Opening payment gateway for amount:", totalAmount);
  }, [totalAmount]);

  const handlePaymentSuccess = () => {
    console.log("Payment successful!");
    closePayment(); // Close the payment dialog on success
  };

  const handlePaymentFailure = () => {
    console.log("Payment failed.");
    closePayment(); // Close the payment dialog on failure
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-10 rounded shadow-lg text-center">
        <h2 className="text-lg font-bold mb-4">Complete Your Payment</h2>
        <p>Total Amount: ${totalAmount}</p>
        <div className="mt-5 space-x-4">
          <Button onClick={handlePaymentSuccess}>Confirm Payment</Button>
          <Button variant="outline" onClick={handlePaymentFailure}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
