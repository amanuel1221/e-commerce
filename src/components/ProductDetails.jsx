import React, { useEffect, useState } from "react";
import { useParams, useLocation, NavLink } from "react-router-dom";
import useProducts from "../store/useProducts";
import { Heart } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const passedProduct = location.state?.product;

  const {
    products,
    loading,
    fetchingProducts,
    addToCart,
    favorites,
    toggleFavorite,
  } = useProducts();

  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (!passedProduct && products.length === 0) {
      fetchingProducts();
    }
  }, [products, fetchingProducts, passedProduct]);

  const product = passedProduct || products.find((p) => p.id === id);

  useEffect(() => {
    if (product) {
      setMainImage(product.image1); 
    }
  }, [product]);

  if (loading) return <p className="text-center mt-20">Loading product...</p>;
  if (!product) return <p className="text-center mt-20">Product not found.</p>;

  const isFavorite = favorites.some((item) => item.id === product.id);


  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const images = [product.image1, product.image2, product.image3].filter(Boolean);

  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
       
        <div className="flex flex-col gap-4">
          <div className="relative">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-96 object-cover rounded-2xl shadow-md"
            />
            <button
              onClick={() => toggleFavorite(product)}
              className="absolute top-4 right-4 p-3 rounded-full transition-transform duration-200 transform hover:scale-110"
            >
              <Heart
                className={`w-8 h-8 transition-colors duration-300 ${
                  isFavorite ? "text-red-500" : "text-gray-400"
                }`}
                fill={isFavorite ? "currentColor" : "none"}
              />
            </button>
          </div>

          
          <div className="flex gap-4 mt-2">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`view-${index + 1}`}
                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition-transform duration-200 hover:scale-105 ${
                  mainImage === img ? "border-blue-500" : "border-gray-200"
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-xl font-semibold text-gray-900">${product.price}</p>
          <p className="text-gray-700">{product.description}</p>

          <button
            onClick={() => addToCart(product)}
            className="bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
          >
            Add To Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {relatedProducts.map((item) => {
              const isFav = favorites.some((fav) => fav.id === item.id);
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
                        className="absolute top-2 right-2 p-2 rounded-full transition-transform duration-200 transform hover:scale-110"
                      >
                        <Heart
                          className={`w-6 h-6 transition-colors duration-300 ${
                            isFav ? "text-red-500" : "text-gray-400"
                          }`}
                          fill={isFav ? "currentColor" : "none"}
                        />
                      </button>
                    </div>
                  </NavLink>
                  <div className="p-4 flex flex-col gap-2 text-gray-700">
                    <p className="font-semibold text-lg truncate">{item.name}</p>
                    <p className="text-sm text-gray-500">⭐ {item.rating}</p>
                    <p className="font-bold text-gray-800">${item.price}</p>
                    <button
                      onClick={() => addToCart(item)}
                      className="mt-2 bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
