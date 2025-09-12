import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaHeart, FaSearch } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HeroSection from "./HeroSection";
import logo from "../assets/logo-DmEux5Mw.png";

const Navbar = () => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const navigate = useNavigate();

  const categories = [
    "Custom Printed T-Shirts",
    "Electronic",
    "Kitchen",
    "Duffle & Gym Bags",
    "Bags",
    "Bluetooth",
    "Buds",
    "BluetoothSpeakers",
    "Smartwatch",
    "GraphicsCards",
    "Office Products"
  ];

  // Load wishlist count from localStorage
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistCount(wishlist.length);
  }, []);

  return (
    <>
      {/* Top Header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center fw-bold text-success" to="/">
            <img
               src={logo}
              alt="Logo"
              style={{
                height: "70px",
                width: "auto",
                marginRight: "10px",
              }}
            />
          </Link>

          {/* Toggler for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTop"
            aria-controls="navbarTop"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Right side */}
          <div className="collapse navbar-collapse justify-content-end" id="navbarTop">
            <form className="d-flex me-3 my-2 my-lg-0" onSubmit={(e) => e.preventDefault()}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search products..."
              />
              <button className="btn btn-outline-success" type="submit">
                <FaSearch />
              </button>
            </form>
            <div className="d-flex align-items-center gap-3 position-relative">
              <Link to="/wishlist" className="text-dark position-relative">
                <FaHeart size={22} />
                {wishlistCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "10px" }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="text-dark">
                <FaShoppingCart size={22} />
              </Link>
              <Link to="/login" className="text-dark">
                <FaUser size={22} />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Sub-header / Categories */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCategories"
            aria-controls="navbarCategories"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCategories">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {categories.map((cat, index) => (
                <li className="nav-item dropdown" key={index}>
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {cat}
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/${cat.replace(/\s+/g,'').toLowerCase()}`}
                      >
                        {cat} Products
                      </Link>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <HeroSection />
    </>
  );
};

export default Navbar;
