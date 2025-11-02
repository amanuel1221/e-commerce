import React, { useEffect } from 'react';
import UseProducts from '../store/UseProducts';

const ProductCard = () => {
  const { products, error, loading, fetchingProducts } = UseProducts();

  useEffect(() => {
    // fetch once on mount
    fetchingProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen" id="productcard">
      {loading && (
        <p className="text-center text-gray-500 text-lg">Loading products...</p>
      )}
      {error && (
        <p className="text-center text-red-500 text-lg">{error}</p>
      )}
      {products.length === 0 && !loading && (
        <p className="text-center text-gray-400 text-lg">No products available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.slice(0, 12).map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-100 hover:from-gray-50 hover:to-gray-200"
          >
            <div className="w-full h-60 bg-gray-100">
              <img
                src={item.image1}
                alt={item.name}
                className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 flex flex-col gap-1 text-gray-700">
              <p className="font-semibold text-lg truncate">{item.name}</p>
              <p className="text-sm text-gray-500">⭐ {item.rating}</p>
              <p className="font-bold text-gray-800">${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
