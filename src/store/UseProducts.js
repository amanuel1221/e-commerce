import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProducts = create(
  persist(
    (set, get) => ({
      products: [],
      cart: [],
      favorites: [],
      loading: false,
      error: null,
      count: 9,
      filterCategory: "All",
      filterSize: "All",
      sortOption: "none",
      searchQuery: "",

      setFilterCategory: (category) => set({ filterCategory: category }),
      setFilterSize: (size) => set({ filterSize: size }),
      setSortOption: (option) => set({ sortOption: option }),
      setSearchQuery: (query) => set({ searchQuery: query }),

      resetCount: () => set({ count: 9 }),
      loadMore: () => set((state) => ({ count: state.count + 3 })),

      fetchingProducts: async () => {
        set({ loading: true, error: null, products: [] });
        try {
          const res = await fetch("/Data/Products.json");
          if (!res.ok) throw new Error("Network is not working properly");
          const data = await res.json();
          set({ products: data, loading: false, error: null });
        } catch (error) {
          set({ products: [], loading: false, error: error.message });
        }
      },

      addToCart: (item) => {
        set((state) => {
          const existing = state.cart.find((c) => c.id === item.id);
          const updatedCart = existing
            ? state.cart.map((c) =>
                c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
              )
            : [...state.cart, { ...item, quantity: 1 }];
          return { cart: updatedCart };
        });
      },

      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((c) => c.id !== id),
        }));
      },

      incrementQuantity: (id) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }));
      },

      decrementQuantity: (id) => {
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      clearCart: () => set({ cart: [] }),

      toggleFavorite: (item) => {
        set((state) => {
          const exists = state.favorites.find((fav) => fav.id === item.id);
          return exists
            ? { favorites: state.favorites.filter((fav) => fav.id !== item.id) }
            : { favorites: [...state.favorites, item] };
        });
      },

      getFilteredSortedItems: () => {
        const { products, filterCategory, filterSize, sortOption, searchQuery } =
          get();

        let filtered =
          filterCategory === "All"
            ? products
            : products.filter((i) => i.category === filterCategory);

        let sized =
          filterSize === "All"
            ? filtered
            : filtered.filter((i) => i.size === filterSize);

        if (searchQuery) {
          sized = sized.filter((i) =>
            i.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        let sorted = [...sized];
        if (sortOption === "PriceLowHigh") sorted.sort((a, b) => a.price - b.price);
        else if (sortOption === "PriceHighLow")
          sorted.sort((a, b) => b.price - a.price);

        return sorted;
      },
    }),
    {
      name: "products-storage",
    }
  )
);

export default useProducts;
