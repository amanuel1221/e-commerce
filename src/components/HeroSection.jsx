import React, { useState, useEffect } from "react";

const HeroSection= () => {
  const slides = [
    {
      id: 1,
      title: "Discover Quality, Shop Smart & Feel Great!",
      subtitle:
        "Explore our curated collection of tech, fashion, and lifestyle products. Your next favorite find is just a click away.",
      image:
        "/images/tech-jpg.jpg"
    },
    {
      id: 2,
      title: "Upgrade Your Style with Comfort & Confidence",
      subtitle:
        "From timeless essentials to new arrivals — redefine your look with quality and class.",
      image:
        "/images/fashion-style.jpg",
      button: "Explore Fashion",
    },
    {
      id: 3,
      title: "Innovate Your World with Smart Gadgets",
      subtitle:
        "Find cutting-edge tech that simplifies your life — all at unbeatable prices.",
      image:
        "/images/soft-heading.jpg",
      button: "See Gadgets",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[current];

  return (
    <header className="relative w-full h-[80vh] overflow-hidden rounded-b-3xl shadow-sm mt-[64px]">
      
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${slide.image})` }}
      ></div>

    
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>

      
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-20 text-white max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
          {slide.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-6">{slide.subtitle}</p>
        <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 w-fit"
     >

          {slide.button}
        </button>
           
      </div>

      
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-white" : "bg-white/50"
            } transition-all duration-300`}
          ></button>
        ))}
      </div>
    </header>
  );
};

export default HeroSection;
