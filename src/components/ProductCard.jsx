import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import useProducts from "../store/UseProducts";
import { Heart } from "lucide-react";

const ProductCard = () => {
  
  const cart = useProducts((state) => state.cart);
  const favorites = useProducts((state) => state.favorites);
  const count = useProducts((state) => state.count);
  const fetchingProducts = useProducts((state) => state.fetchingProducts);
  const addToCart = useProducts((state) => state.addToCart);
  const loadMore = useProducts((state) => state.loadMore);
  const resetCount = useProducts((state) => state.resetCount);
  const toggleFavorite = useProducts((state) => state.toggleFavorite);
  const loading = useProducts((state) => state.loading);
  const error = useProducts((state) => state.error);

  const filterCategory = useProducts((state) => state.filterCategory);
  const sortOption = useProducts((state) => state.sortOption);
  const searchQuery = useProducts((state) => state.searchQuery);
  const setFilterCategory = useProducts((state) => state.setFilterCategory);
  const setSortOption = useProducts((state) => state.setSortOption);
  const setSearchQuery = useProducts((state) => state.setSearchQuery);

  const getFilteredSortedItems = useProducts((state) => state.getFilteredSortedItems);

  useEffect(() => {
    fetchingProducts();
    resetCount();
  }, [fetchingProducts, resetCount]);
  const rawProducts = typeof getFilteredSortedItems === "function" ? getFilteredSortedItems() : [];
  const products = Array.isArray(rawProducts) ? rawProducts : rawProducts ? Object.values(rawProducts) : [];

  const getCartCount = (id) => {
    const found = cart.find((item) => item.id === id);
    return found ? found.quantity : 0;
  };

  const isFavorite = (id) => favorites.some((item) => item.id === id);

  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />

        <div className="flex flex-wrap gap-3 justify-center sm:justify-end">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="All">All Categories</option>
            <option value="Clothes">Clothes</option>
            <option value="Shoes">Shoes</option>
            <option value="Electronics">Electronics</option>
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="none">Default</option>
            <option value="PriceLowHigh">Price: Low to High</option>
            <option value="PriceHighLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Loading / Errors */}
      {loading && <p className="text-center text-gray-500 text-lg">Loading products...</p>}
      {error && <p className="text-center text-red-500 text-lg">{error}</p>}
      {!loading && products.length === 0 && (
        <p className="text-center text-gray-400 text-lg">No products found.</p>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6">
        {products.slice(0, count).map((item) => {
          const countInCart = getCartCount(item.id);

          return (
            <div
              key={item.id}
              className="relative flex flex-col border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-100 hover:from-gray-50 hover:to-gray-200"
            >
              <NavLink to={`/product/${item.id}`} state={{ product: item }}>
                <div className="w-full h-80 bg-gray-100 relative">
                  <img
                    src={item.image1}
                    alt={item.name}
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  />

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(item);
                    }}
                    className="absolute top-2 right-2 p-2 rounded-full transition-transform duration-200 hover:scale-110"
                  >
                    <Heart
                      className={`w-6 h-6 ${isFavorite(item.id) ? "text-red-500" : "text-gray-400"}`}
                      fill={isFavorite(item.id) ? "currentColor" : "none"}
                    />
                  </button>
                </div>
              </NavLink>

              <div className="p-4 flex flex-col gap-2 text-gray-700">
                <p className="font-semibold text-lg truncate">{item.name}</p>
                <p className="text-sm text-gray-500">⭐ {item.rating}</p>
                <p className="font-bold text-gray-800">${Number(item.price).toFixed(2)}</p>

                <button
                  onClick={() => addToCart(item)}
                  className="mt-2 bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded-xl transition"
                >
                  Add To Cart {countInCart > 0 && `(${countInCart})`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load more */}
      {count < products.length && (
        <div className="flex justify-end mt-8">
          <button
            onClick={loadMore}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition font-semibold"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
