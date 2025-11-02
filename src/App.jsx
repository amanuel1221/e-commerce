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


function App() {
  

  return (
    <>
    <Router>
      <Navbar/>
     <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/favorites" element={<Favorites />} />

     </Routes>
      <Footer />
    </Router>
     </>
  )
}

export default App;
