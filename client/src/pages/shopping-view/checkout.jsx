import { useNavigate } from "react-router-dom";
import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items.content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import toast system
import "react-toastify/dist/ReactToastify.css"; // Import CSS for react-toastify

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    name: "",
    idNumber: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate(); // Add navigation hook

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = () => {
    setShowConfirm(true); // Show confirmation form
  };

  const validateForm = () => {
    const { phoneNumber, name, idNumber, password } = formData;
    if (!phoneNumber || !name || !idNumber || !password) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const handleCheckout = () => {
    if (validateForm()) {
      // Simulate checkout process
      setShowAlert(true);
      toast.success("Payment successful! Redirecting...");

      // After successful checkout, redirect to /shop/account
      setTimeout(() => {
        navigate("/shop/account"); // Redirect to account page
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          className="h-full w-full object-cover object-center"
          alt="Checkout"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0 ? (
            cartItems.items.map((item) => (
              <UserCartItemsContent key={item.id} cartItem={item} />
            ))
          ) : (
            <p>No items in the cart.</p>
          )}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button
              className="w-full"
              onClick={handleConfirm}
              variant="outline"
              size="lg"
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-10 rounded shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Your Details</h2>
            <div className="space-y-4 mb-4">
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded w-full"
              />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded w-full"
              />
              <input
                type="text"
                name="idNumber"
                placeholder="ID Number"
                value={formData.idNumber}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded w-full"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <Button
              className="w-full mb-4"
              onClick={handleCheckout}
              variant="outline"
              size="lg"
            >
              Confirm and Checkout
            </Button>
            <Button
              className="w-full"
              onClick={() => setShowConfirm(false)}
              variant="outline"
              size="lg"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {showAlert && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-10 rounded shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4">Payment Confirmation</h2>
            <p>Your payment of ${totalCartAmount} has been processed successfully!</p>
            <Button
              className="mt-4"
              onClick={() => setShowAlert(false)}
              variant="outline"
              size="lg"
            >
              OK
            </Button>
          </div>
        </div>
      )}

      {/* Add ToastContainer to enable toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default ShoppingCheckout;
