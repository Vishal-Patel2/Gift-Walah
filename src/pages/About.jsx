import React from "react";
import { FaGift, FaShippingFast, FaHeadset } from "react-icons/fa";

const About = () => {
  return (
    <section className="container my-5">
      <div className="row align-items-center">
        {/* Left: Image */}
        <div className="col-12 col-md-6 mb-4 mb-md-0 d-flex justify-content-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1F28AV4Eeww0AjrN1F6OoxcBc4jAxl5SXUg&s"
            alt="About GiftWalah"
            className="img-fluid rounded shadow"
            style={{
              maxWidth: "400px",
              width: "100%",
              height: "auto",
            }}
          />
        </div>

        {/* Right: Text */}
        <div className="col-12 col-md-6">
          <h2 className="fw-bold mb-3 text-success">About GiftWalah</h2>
          <p className="mb-3" style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
            Welcome to <span className="fw-bold text-success">GiftWalah</span>! 
            We specialize in delivering the finest gifts and products with top-notch quality and exceptional customer service. Our goal is to make every occasion special for our customers by offering unique and affordable products.
          </p>
          <p className="mb-4" style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
            From personalized gifts to innovative gadgets, we ensure that every product meets your expectations. Shop with us for a seamless, joyful, and memorable experience!
          </p>

          {/* Features / Icons */}
          <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
            <div className="d-flex align-items-center gap-2">
              <FaGift className="text-success" size={24} />
              <span>Unique Gifts</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <FaShippingFast className="text-success" size={24} />
              <span>Fast Delivery</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <FaHeadset className="text-success" size={24} />
              <span>24/7 Support</span>
            </div>
          </div>

          <a href="/about" className="btn btn-success btn-lg">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
