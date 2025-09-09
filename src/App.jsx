import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Whislist from "./pages/Whislist";
import Shipping from "./pages/Shipping";


const App = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/wishlist" element={<Whislist/>} />
          <Route path="/shipping-returns" element={<Shipping/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
