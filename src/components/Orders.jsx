import React, { useMemo } from "react";
import useOrders from "../store/useOrders";
import { useAuth } from "../context/authContext";
import { CheckCircle, Clock } from "lucide-react";

const Orders = () => {
  const { user } = useAuth();
  const allOrders = useOrders((state) => state.orders);
  const clearOrders = useOrders((state) => state.clearOrders);
  const markDelivered = useOrders((state) => state.markDelivered);

  // Only filter orders when `user` or `allOrders` change
  const orders = useMemo(() => {
    if (!user) return [];
    return allOrders.filter((order) => order.userEmail === user.email);
  }, [allOrders, user]);

  const handleClearHistory = () => {
    if (!user) return;
    if (window.confirm("Are you sure you want to clear all your order history?")) {
      clearOrders(user.email);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date) ? "Invalid Date" : date.toLocaleString();
  };

  const estimatedDeliveryDate = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date)) return "Invalid Date";
    date.setDate(date.getDate() + 20); // 20 days delivery
    return date;
  };

  const handleMarkDelivered = (orderId) => {
    markDelivered(orderId);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Your Orders</h2>
        {orders.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
          >
            Clear History
          </button>
        )}
      </div>

      {orders.length === 0 && (
        <p className="text-gray-500 text-lg">You have no orders yet.</p>
      )}

      {orders.map((order) => {
        const estimatedDelivery = estimatedDeliveryDate(order.date);
        const delivered = order.delivered;

        return (
          <div
            key={order.id}
            className="border rounded-xl p-6 mb-6 shadow-md hover:shadow-lg transition bg-gray-50"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-semibold text-gray-700">Order ID: {order.id}</p>
                <p className="font-semibold text-gray-700">
                  Order Date: {formatDate(order.date)}
                </p>
                <p className="text-gray-600">
                  Estimated Delivery: {estimatedDelivery.toLocaleString()}
                </p>
                <p className="text-gray-700">
                  Shipping: {order.shipping.address}, {order.shipping.city}
                </p>
                <p className="text-gray-700 font-bold">
                  Total: ${Number(order.total || 0).toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  {delivered ? (
                    <>
                      <CheckCircle className="text-green-600 w-6 h-6" />
                      <span className="font-semibold text-green-600">Delivered</span>
                    </>
                  ) : (
                    <>
                      <Clock className="text-yellow-600 w-6 h-6" />
                      <span className="font-semibold text-yellow-600">Pending</span>
                    </>
                  )}
                </div>
                {!delivered && (
                  <button
                    onClick={() => handleMarkDelivered(order.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition font-medium mt-1"
                  >
                  Delivered 
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(order.items || []).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border p-3 rounded-lg bg-white"
                >
                  <img
                    src={item.image1}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-500">
                      Quantity: {item.quantity} × ${Number(item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
