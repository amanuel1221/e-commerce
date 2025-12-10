import React from "react";
import { Link } from "react-router-dom";
import useProducts from "../store/UseProducts";
import { Heart } from "lucide-react";

const Favorites = () => {
  const { favorites, toggleFavorite, addToCart, cart } = useProducts();

  const getCartCount = (id) => {
    const found = cart.find((item) => item.id === id);
    return found ? found.quantity : 0;
  };

  if (favorites.length === 0)
    return <p className="text-center mt-20 text-gray-500">No favorites yet.</p>;

  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Your Favorites</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {favorites.map((item) => {
          const countInCart = getCartCount(item.id);
          return (
            <div
              key={item.id}
              className="relative flex flex-col border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-100 hover:from-gray-50 hover:to-gray-200"
            >
              <Link to={`/product/${item.id}`} state={{ product: item }}>
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
                    className="absolute top-2 right-2 p-2 rounded-full transition-transform duration-200 transform hover:scale-110"
                  >
                    <Heart
                      className={`w-6 h-6 transition-colors duration-300 text-red-500`}
                      fill="currentColor"
                    />
                  </button>
                </div>
              </Link>
              <div className="p-4 flex flex-col gap-2 text-gray-700">
                <p className="font-semibold text-lg truncate">{item.name}</p>
                <p className="text-sm text-gray-500">⭐ {item.rating}</p>
                <p className="font-bold text-gray-800">${item.price}</p>

                <button
                  onClick={() => addToCart(item)}
                  className="mt-2 bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
                >
                  Add To Cart {countInCart > 0 && `(${countInCart})`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
