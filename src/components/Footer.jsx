import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5">
      <div className="container">
        <div className="row align-items-start">
          {/* Left: Logo */}
          <div className="col-md-3 mb-4 d-flex flex-column align-items-start">
            <Link
              to="/"
              className="d-flex align-items-center text-decoration-none mb-3"
            >
              <img
                src="https://giftwalah.com/assets/logo1.png"
                alt="Logo"
                style={{ height: "90px", width: "auto", marginRight: "10px" }}
              />
              
            </Link>
           
          </div>

          {/* Middle: Quick Links */}
          <div className="col-md-3 mb-4">
            <h5 className="text-success">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white text-decoration-none">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-white text-decoration-none"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white text-decoration-none">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Middle: Customer Service */}
          <div className="col-md-3 mb-4">
            <h5 className="text-success">Customer Service</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/faq" className="text-white text-decoration-none">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping-returns"
                  className="text-white text-decoration-none"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-white text-decoration-none">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white text-decoration-none">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Right: Contact Info */}
          <div className="col-md-3 mb-4">
            <h5 className="text-success">Contact Info</h5>
            <p className="mb-1">
              Email:{" "}
              <a
                href="mailto:Info@giftwalah.com"
                className="text-white text-decoration-none"
              >
                Info@giftwalah.com
              </a>
            </p>
            <p className="mb-1">
              Phone: +91 9999368393, 9220479555, 9999579239
            </p>
            <p>
              Address: 158, DSIDC COMPLEX, OKHLA INDUSTRIAL AREA PHASE-1, NEW
              DELHI-110020, DELHI, INDIA
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="text-center py-3 border-top border-secondary mt-3">
          &copy; {new Date().getFullYear()} GiftWalah. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
