import React from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../store/useProducts";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = useProducts();

  // ✅ Calculate total price (with discount if applicable)
  const totalPrice = cart.reduce(
    (acc, item) =>
      acc +
      (item.price - (item.discount ? item.price * (item.discount / 100) : 0)) *
        item.quantity,
    0
  );

  return (
    <div className="p-6 m-6 rounded-2xl shadow-md bg-white transition-all duration-300 hover:shadow-lg min-h-screen flex flex-col">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        🛒 Your Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">Your cart is empty.</p>
      ) : (
        <>
          {/* Cart Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="border px-4 py-2">Product</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2 text-center">Quantity</th>
                  <th className="border px-4 py-2">Total</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition duration-200">
                    <td className="border px-4 py-2 flex items-center gap-3">
                      <img
                        src={item.image1 || item.image || "/placeholder.jpg"}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-md"
                      />
                      <span className="font-semibold text-gray-800">
                        {item.name}
                      </span>
                    </td>

                    <td className="border px-4 py-2 text-gray-700">
                      $
                      {(
                        item.price -
                        (item.discount ? item.price * (item.discount / 100) : 0)
                      ).toFixed(2)}
                    </td>

                    <td className="border px-4 py-2 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          className="bg-red-500 text-white w-7 h-7 rounded hover:bg-red-600 transition"
                        >
                          -
                        </button>
                        <span className="px-2 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => incrementQuantity(item.id)}
                          className="bg-green-500 text-white w-7 h-7 rounded hover:bg-green-600 transition"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="border px-4 py-2 font-semibold text-gray-800">
                      $
                      {(
                        (item.price -
                          (item.discount ? item.price * (item.discount / 100) : 0)) *
                        item.quantity
                      ).toFixed(2)}
                    </td>

                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <button
              onClick={clearCart}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition font-semibold"
            >
              Clear Cart
            </button>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <h3 className="text-2xl font-bold text-gray-900">
                Total:{" "}
                <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
              </h3>

              {/* ✅ Proceed to Checkout Button */}
              <button
                onClick={() => navigate("/checkout")}
                className="bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600 transition font-semibold"
              >
                Proceed to Checkout →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
