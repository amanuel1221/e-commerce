import { create } from "zustand";
import { persist } from "zustand/middleware";

const createOrdersStore = (email) =>
  create(
    persist(
      (set, get) => ({
        orders: [],

        addOrder: (order) =>
          set((state) => ({
            orders: [...state.orders, order],
          })),

        markDelivered: (id) =>
          set((state) => ({
            orders: state.orders.map((o) =>
              o.id === id ? { ...o, delivered: true } : o
            ),
          })),
          clearOrders: (userEmail) =>
  set((state) => ({
    orders: state.orders.filter((order) => order.userEmail !== userEmail),
  })),


        getUserOrders: (userEmail) =>
          get().orders.filter((order) => order.userEmail === userEmail),
      }),
      { name: `orders-storage-${email}` }
    )
  );

// cache per-user stores
const stores = {};

// selector: optional selector function; email: optional email string to select which persisted store
export default function useOrders(selector, email = "default") {
  const key = email || "default";
  if (!stores[key]) stores[key] = createOrdersStore(key);

  const store = stores[key];
  return typeof selector === "function" ? store(selector) : store();
}
