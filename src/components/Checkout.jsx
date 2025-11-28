import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../store/useProducts";
import useOrders from "../store/useOrders";
import { useAuth } from "../context/authContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useProducts();
  const { user } = useAuth();
  const addOrder = useOrders((state) => state.addOrder);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [shipping, setShipping] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
  });

  const [payment, setPayment] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const total = cart.reduce(
    (acc, item) =>
      acc +
      (item.price - (item.discount ? item.price * (item.discount / 100) : 0)) *
        item.quantity,
    0
  );

  const handleShippingChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (!shipping.name || !shipping.address || !shipping.city || !shipping.phone) {
      alert("Please fill all shipping fields.");
      return;
    }
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!payment.cardName || !payment.cardNumber || !payment.expiry || !payment.cvv) {
      alert("Please fill all payment details.");
      return;
    }

    if (payment.cardNumber.length < 16 || payment.cvv.length < 3) {
      alert("Invalid card details.");
      return;
    }

    // Simulate payment process
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // ✅ Add order to useOrders store
      addOrder({
        id: Date.now().toString(), // unique order id
        userEmail: user.email,     // logged-in user email
        items: cart.map((i) => ({ ...i })), // copy of cart items
        total: total.toFixed(2),
        shipping,
        delivered: false,
        date: new Date().toISOString(), // ✅ proper order date
      });

      clearCart();

      setTimeout(() => navigate("/orders"), 2500); // redirect to orders
    }, 2000);
  };

  if (cart.length === 0 && !success) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        {success
          ? "🎉 Order Successful!"
          : step === 1
          ? "Shipping Details"
          : "Payment Information"}
      </h2>

      {/* Order Summary */}
      {!success && (
        <div className="border rounded-lg p-4 mb-6 bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-2 text-gray-700">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>
                $
                {(
                  (item.price - (item.discount ? item.price * (item.discount / 100) : 0)) *
                  item.quantity
                ).toFixed(2)}
              </span>
            </div>
          ))}
          <hr className="my-2" />
          <div className="font-bold text-right text-gray-900">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}

      {/* Step 1: Shipping */}
      {step === 1 && !success && (
        <form onSubmit={handleShippingSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={shipping.name}
            onChange={handleShippingChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
          <input
            name="address"
            placeholder="Address"
            value={shipping.address}
            onChange={handleShippingChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
          <input
            name="city"
            placeholder="City"
            value={shipping.city}
            onChange={handleShippingChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={shipping.phone}
            onChange={handleShippingChange}
            className="w-full border px-4 py-2 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition"
          >
            Continue to Payment →
          </button>
        </form>
      )}

      {/* Step 2: Payment */}
      {step === 2 && !success && (
        <form onSubmit={handlePaymentSubmit} className="space-y-4">
          <input
            name="cardName"
            placeholder="Cardholder Name"
            value={payment.cardName}
            onChange={handlePaymentChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
          <input
            name="cardNumber"
            placeholder="Card Number (16 digits)"
            maxLength="16"
            value={payment.cardNumber}
            onChange={handlePaymentChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
          <div className="flex gap-4">
            <input
              name="expiry"
              placeholder="MM/YY"
              maxLength="5"
              value={payment.expiry}
              onChange={handlePaymentChange}
              className="w-1/2 border px-4 py-2 rounded-lg"
            />
            <input
              name="cvv"
              placeholder="CVV"
              maxLength="3"
              value={payment.cvv}
              onChange={handlePaymentChange}
              className="w-1/2 border px-4 py-2 rounded-lg"
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition font-semibold"
            >
              ← Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
            </button>
          </div>
        </form>
      )}

      {/* Success Message */}
      {success && (
        <div className="text-center text-green-600 py-10">
          <p className="text-2xl font-bold mb-4">🎉 Payment Successful!</p>
          <p className="text-gray-700 mb-2">
            Thank you, {shipping.name}. Your order will be delivered to:
          </p>
          <p className="text-gray-600 italic">
            {shipping.address}, {shipping.city}
          </p>
          <p className="mt-4 text-gray-500 text-sm">Redirecting to your orders...</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
