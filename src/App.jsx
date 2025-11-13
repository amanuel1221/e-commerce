import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import ProductCard from './components/ProductCard';
import HomePage from './pages/HomePage';
import Cart from './pages/Cart';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

import Footer from './components/Footer';
import Favorites from './components/Favorites';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from './components/Profile';

function App() {
  

  return (
    <>
     <ToastContainer position="top-center" />
    <Router>
      <Navbar/>
     <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/profile" element={<Profile />} />

     </Routes>
      <Footer />
    </Router>
     </>
  )
}

export default App;
