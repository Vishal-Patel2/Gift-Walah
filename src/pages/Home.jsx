import React, { useEffect, useState } from "react";
import About from "./About";
import { FaArrowLeft, FaArrowRight, FaHeart } from "react-icons/fa";

const Home = () => {
  // Products
  const productsRow1 = [
    { id: 1, name: "Custom Printed T-Shirt", price: 499, image: "https://res.cloudinary.com/dnexwb7jw/image/upload/v1756206400/products/eosrhtzb9d5szhmvbxjf.png" },
    { id: 2, name: "Bluetooth Speaker", price: 1299, image: "https://res.cloudinary.com/dnexwb7jw/image/upload/v1756206585/products/ly9pdtbixfp3tfcwiyw5.png" },
    { id: 3, name: "Smartwatch", price: 3499, image: "https://res.cloudinary.com/dnexwb7jw/image/upload/v1756207330/products/odfhcvvqxa5lpti05m7p.png" },
    { id: 4, name: "Smartwatch", price: 3499, image: "https://res.cloudinary.com/dnexwb7jw/image/upload/v1756207330/products/odfhcvvqxa5lpti05m7p.png" },
    { id: 5, name: "Smartwatch", price: 3499, image: "https://res.cloudinary.com/dnexwb7jw/image/upload/v1756207330/products/odfhcvvqxa5lpti05m7p.png" },
    { id: 6, name: "Smartwatch", price: 3499, image: "https://res.cloudinary.com/dnexwb7jw/image/upload/v1756207330/products/odfhcvvqxa5lpti05m7p.png" },
    { id: 7, name: "Smartwatch", price: 3499, image: "https://res.cloudinary.com/dnexwb7jw/image/upload/v1756207330/products/odfhcvvqxa5lpti05m7p.png" },
  ];

  const productsRow2 = [
    { id: 4, name: "Kitchen Knife Set", price: 799, image: "https://res.cloudinary.com/dnexwb7jw/image/upload/v1755929994/products/yvxwflwnxvrkx8qi2wwg.png" },
    { id: 5, name: "Duffle Bag", price: 1299, image: "https://res.cloudinary.com/dnexwb7jw/image/upload/v1755935102/products/qqwagc6xoueoxwf6s7gr.jpg" },
    { id: 6, name: "Smartphone", price: 9999, image: "https://res.cloudinary.com/dnexwb7jw/image/upload/v1756101236/products/zfrczom27rpwolt8y7un.png" },
    { id: 7, name: "Smartphone", price: 9999, image: "https://res.cloudinary.com/dnexwb7jw/image/upload/v1756108756/products/iaegu4pvcfzbh2ifayfb.png" },
    { id: 8, name: "Smartphone", price: 9999, image: "https://res.cloudinary.com/dnexwb7jw/image/upload/v1756121835/products/weel31qmsqhi0jpfdvlt.png" },
    { id: 9, name: "Smartphone", price: 9999, image: "https://res.cloudinary.com/dnexwb7jw/image/upload/v1756119660/products/g1nxwqnrqteu5x8w7egn.png" },
  ];

  // Wishlist state
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  // Add or remove from wishlist
  const toggleWishlist = (product) => {
    let updatedWishlist;
    if (wishlist.find((item) => item.id === product.id)) {
      // Remove
      updatedWishlist = wishlist.filter((item) => item.id !== product.id);
    } else {
      // Add
      updatedWishlist = [...wishlist, product];
    }
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // Scroll functions
  const scrollLeft = (rowId) => {
    document.getElementById(rowId).scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = (rowId) => {
    document.getElementById(rowId).scrollBy({ left: 250, behavior: "smooth" });
  };

  // Render product row
  const renderRow = (rowId, products) => (
    <div className="position-relative mb-5">
      <button
        onClick={() => scrollLeft(rowId)}
        className="btn btn-success position-absolute top-50 start-0 translate-middle-y"
        style={{ zIndex: 10, opacity: 0.7, width: "40px", height: "40px", borderRadius: "50%" }}
      >
        <FaArrowLeft />
      </button>

      <div
        id={rowId}
        className="d-flex overflow-auto pb-3"
        style={{ scrollBehavior: "smooth", scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="card me-3 flex-shrink-0"
            style={{ minWidth: "200px", height: "320px", position: "relative" }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="card-img-top"
              style={{ objectFit: "cover", height: "180px" }}
            />
            <div className="card-body d-flex flex-column p-2">
              <h6 className="card-title mb-1">{product.name}</h6>
              <p className="card-text mt-auto mb-2">₹ {product.price}</p>
              <button className="btn btn-success btn-sm mb-2">Add to Cart</button>
            </div>
            {/* Heart icon for wishlist */}
            <FaHeart
              size={20}
              color={wishlist.find((item) => item.id === product.id) ? "red" : "gray"}
              style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }}
              onClick={() => toggleWishlist(product)}
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => scrollRight(rowId)}
        className="btn btn-success position-absolute top-50 end-0 translate-middle-y"
        style={{ zIndex: 10, opacity: 0.7, width: "40px", height: "40px", borderRadius: "50%" }}
      >
        <FaArrowRight />
      </button>
    </div>
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Welcome to MyShop</h1>
      {renderRow("productRow1", productsRow1)}
      {renderRow("productRow2", productsRow2)}
      <About />
    </div>
  );
};

export default Home;
