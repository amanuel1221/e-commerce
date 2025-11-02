import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
   <ul className="bg-white border-b border-gray-250">
   <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Left Section - Logo & Links */}
        <div className="flex items-center space-x-8">
          {/* Logo / App Name */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-xl font-semibold ${
                isActive ? "text-blue-600" : "text-blue-500"
              } hover:text-blue-700 transition-colors duration-200`
            }
          >
            StyleHub
          </NavLink>
          
          </div>
          <div className="flex items-center space-x-8">
            <NavLink to="/cart" className={({isActive})=>`text-xl font-semibold ${
                isActive ? "text-blue-600" : "text-blue-500"
              } hover:text-blue-700 transition-colors duration-200`} >
                Cart
                </NavLink>
                <NavLink to="/signin" className={({isActive})=>`text-xl font-semibold ${
                isActive ? "text-blue-600" : "text-blue-500"
              } hover:text-blue-700 transition-colors duration-200`} >
                SignIn
                </NavLink>
                <NavLink to="/signup" className={({isActive})=>`text-xl font-semibold ${
                isActive ? "text-blue-600" : "text-blue-500"
              } hover:text-blue-700 transition-colors duration-200`} >
                Sign Up
                </NavLink>
                <NavLink to="/favorites" className={({isActive})=>`text-xl font-semibold ${
                isActive ? "text-blue-600" : "text-blue-500"
              } hover:text-blue-700 transition-colors duration-200`} >
                favorites
                </NavLink>

            
          </div>

 



    </div>

   </ul>
  )
}

export default Navbar;
