import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuth } from "../context/AuthContext";

const createProductsStore = (email) => {
  return create(
    persist(
      (set, get) => ({
        products: [],
        cart: [],
        favorites: [],
        orders: [],
        loading: false,
        error: null,
        count: 9,
        filterCategory: "All",
        filterSize: "All",
        sortOption: "none",
        searchQuery: "",

        // FILTERS
        setFilterCategory: (category) => set({ filterCategory: category }),
        setFilterSize: (size) => set({ filterSize: size }),
        setSortOption: (option) => set({ sortOption: option }),
        setSearchQuery: (query) => set({ searchQuery: query }),

        resetCount: () => set({ count: 9 }),
        loadMore: () => set((state) => ({ count: state.count + 3 })),

        // FETCH PRODUCTS
        fetchingProducts: async () => {
          set({ loading: true, error: null, products: [] });
          try {
            const res = await fetch("/Data/Products.json");
            if (!res.ok) throw new Error("Network Error");
            const data = await res.json();
            set({ products: data, loading: false });
          } catch (error) {
            set({ products: [], loading: false, error: error.message });
          }
        },

        // CART
        addToCart: (item) => {
          set((state) => {
            const existing = state.cart.find((c) => c.id === item.id);
            const updated = existing
              ? state.cart.map((c) =>
                  c.id === item.id
                    ? { ...c, quantity: c.quantity + 1 }
                    : c
                )
              : [...state.cart, { ...item, quantity: 1 }];
            return { cart: updated };
          });
        },

        removeFromCart: (id) => {
          set((state) => ({
            cart: state.cart.filter((c) => c.id !== id),
          }));
        },

        incrementQuantity: (id) => {
          set((state) => ({
            cart: state.cart.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          }));
        },

        decrementQuantity: (id) => {
          set((state) => ({
            cart: state.cart
              .map((i) =>
                i.id === id ? { ...i, quantity: i.quantity - 1 } : i
              )
              .filter((i) => i.quantity > 0),
          }));
        },

        clearCart: () => set({ cart: [] }),

        // FAVORITES
        toggleFavorite: (item) => {
          set((state) => {
            const exists = state.favorites.find((f) => f.id === item.id);
            return exists
              ? { favorites: state.favorites.filter((f) => f.id !== item.id) }
              : { favorites: [...state.favorites, item] };
          });
        },

        // ORDERS
        addOrder: (order) => {
          set((state) => ({
            orders: [...state.orders, order],
            cart: [],
          }));
        },

        // FILTER + SORT
        getFilteredSortedItems: () => {
          const { products, filterCategory, filterSize, sortOption, searchQuery } = get();

          if (!products) return [];

          let filtered = filterCategory === "All"
            ? products
            : products.filter((i) => i.category === filterCategory);

          let sized = filterSize === "All"
            ? filtered
            : filtered.filter((i) => i.size === filterSize);

          if (searchQuery) {
            sized = sized.filter((i) =>
              i.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }

          let sorted = [...sized];
          if (sortOption === "PriceLowHigh") sorted.sort((a, b) => a.price - b.price);
          else if (sortOption === "PriceHighLow") sorted.sort((a, b) => b.price - a.price);

          return sorted || [];
        },

      }),

      {
        name: `products-storage-${email}`,
      }
    )
  );
};

// Cache created stores per-email so each user has isolated persisted state
const stores = {};

export default function useProducts(selector) {
  const { user } = useAuth();
  const email = user?.email || "default";
  if (!stores[email]) {
    stores[email] = createProductsStore(email);
  }

  const storeHook = stores[email];
  // forward selector if provided (matches original zustand hook API)
  return typeof selector === "function" ? storeHook(selector) : storeHook();
}
