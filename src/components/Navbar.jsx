import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseconfig";
import { useAuth } from "../context/authContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-500 font-semibold"
      : "text-gray-300 hover:text-blue-400 transition";

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-extrabold tracking-wide text-blue-400 hover:text-blue-300"
        >
          MyShop 🛍
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>

          {user ? (
            <>
              <NavLink to="/cart" className={navLinkStyle}>
                Cart
              </NavLink>
              <NavLink to="/profile" className={navLinkStyle}>
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/signin" className={navLinkStyle}>
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition font-medium"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-6 py-4 space-y-4 animate-slideDown">
          <NavLink to="/" className={navLinkStyle} onClick={() => setIsOpen(false)}>
            Home
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/cart"
                className={navLinkStyle}
                onClick={() => setIsOpen(false)}
              >
                Cart
              </NavLink>
              <NavLink
                to="/profile"
                className={navLinkStyle}
                onClick={() => setIsOpen(false)}
              >
                Profile
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/signin"
                className={navLinkStyle}
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                className="block bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition font-medium text-center"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
