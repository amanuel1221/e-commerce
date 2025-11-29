import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
    
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-extrabold text-indigo-600">StyleHub</h2>
          <p className="text-gray-500 text-sm mt-1">
            Smart choices. Better living.
          </p>
        </div>

        
        <ul className="flex flex-wrap justify-center gap-6 text-gray-600 text-sm font-medium">
          <li className="hover:text-indigo-600 transition-colors cursor-pointer">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="hover:text-indigo-600 transition-colors cursor-pointer">
            <NavLink to="/categories">Categories</NavLink>
          </li>
          <li className="hover:text-indigo-600 transition-colors cursor-pointer">
            <NavLink to="/deals-privacy">Deals & privacy</NavLink>
          </li>
          <li className="hover:text-indigo-600 transition-colors cursor-pointer">
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>

        
        <div className="flex justify-center gap-4">
          <a
            href="https://www.facebook.com/manuell211" target="_blank" rel="facebook account of Amanuel"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300"
          >
            <FaFacebookF size={14} />
          </a>
          <a
            href="https://twitter.com/AmanuelAma66386
" target="_blank" rel="twitter account of Amanuel"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300"
          > 
            <FaTwitter size={14} />
          </a>
          <a
            href="https://www.instagram.com/manuelll211/
" target="_blank" rel="instagram account of Amanuel"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300"
          > 
            <FaInstagram size={14} />
          </a>
          <a
            href="#"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300"
          >
            <FaLinkedinIn size={14} />
          </a>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-indigo-600">StyleHub</span>  All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
