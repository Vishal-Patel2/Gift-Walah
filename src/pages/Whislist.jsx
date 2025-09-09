import React, { useEffect, useState } from "react";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(savedWishlist);
  }, []);

  // Remove item from wishlist
  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mt-4 text-center">
        <h3>Your Wishlist is Empty!</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Wishlist</h3>
      <div className="row">
        {wishlistItems.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text mt-auto">₹ {product.price}</p>
                <button
                  className="btn btn-danger btn-sm mt-2"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
