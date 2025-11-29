import React from 'react';
import ProductCard from '../components/ProductCard';
import HeroSection from '../components/HeroSection';
import ChatWidget from '../components/ChatWidget';

const HomePage = () => {
  return (
    <div>
        <HeroSection />
      <ProductCard /> 
      < ChatWidget />
    </div>
  )
}

export default HomePage;
