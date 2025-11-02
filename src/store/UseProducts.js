import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useProducts = create(
  persist(
    (set, get) => ({
      products: [],          
      cart: [],              
      favorites: [],         
      loading: false,
      error: null,

    
      fetchingProducts: async () => {
        set({ loading: true, error: null, products: [] });
        try {
          const fetching = await fetch('/Data/Products.json');
          if (!fetching.ok) throw new Error('Network is not working properly');
          const data = await fetching.json();
          set({ products: data, loading: false, error: null });
        } catch (error) {
          set({ products: [], loading: false, error: error.message });
        }
      },

      addToCart: (item) => {
        set((state) => ({
          cart: [...state.cart, item],
        }));
      },

      
      removeFromCart: (itemId) => {
        set((state) => ({
          cart: state.cart.filter((product) => product.id !== itemId),
        }));
      },

    
      toggleFavorite: (item) => {
        set((state) => {
          const exists = state.favorites.find((fav) => fav.id === item.id);
          if (exists) {
            return { favorites: state.favorites.filter((fav) => fav.id !== item.id) };
          } else {
            return { favorites: [...state.favorites, item] };
          }
        });
      },
    }),
    {
      name: 'products-storage', 
    }
  )
);

export default useProducts;
