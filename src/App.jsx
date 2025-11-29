import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Cart from './pages/Cart';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Favorites from './components/Favorites';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';
import Orders from './components/orders';
import Profile from './components/Profile';
import Contact from './components/Contact';
import DealsPrivacy from './components/DealsPrivacy';
import { ToastContainer } from 'react-toastify';

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { Toaster } from "react-hot-toast";

function App() {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
     
      <ToastContainer position="top-center" />

      <Toaster 
        position="top-center"
        reverseOrder={false}
      />

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout userEmail={userEmail} />} />
          <Route path="/orders" element={<Orders userEmail={userEmail} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/deals-privacy" element={<DealsPrivacy />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
