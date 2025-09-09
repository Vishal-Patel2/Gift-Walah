import React from "react";
import { FaTruck, FaClock, FaSearchLocation, FaHeadset } from "react-icons/fa";

const Shipping = () => {
  const shippingInfo = [
    {
      icon: <FaTruck size={30} className="text-success me-3" />,
      title: "Shipping Methods",
      desc: "We offer Standard and Express Delivery. Shipping charges depend on location and delivery speed.",
    },
    {
      icon: <FaClock size={30} className="text-success me-3" />,
      title: "Processing Time",
      desc: "Orders are processed within 24-48 hours after confirmation. You'll receive a shipment confirmation email.",
    },
    {
      icon: <FaSearchLocation size={30} className="text-success me-3" />,
      title: "Delivery Time",
      desc: "Standard: 3-7 business days. Express: 1-3 business days. Delivery times may vary depending on destination.",
    },
    {
      icon: <FaHeadset size={30} className="text-success me-3" />,
      title: "Customer Support",
      desc: (
        <>
          For queries, contact us at <span className="fw-bold text-success">+91 9999368393</span> or email <a href="mailto:Info@giftwalah.com" className="text-success text-decoration-none">Info@giftwalah.com</a>.
        </>
      ),
    },
  ];

  return (
    <section className="container my-5">
      <h2 className="fw-bold mb-4 text-success text-center">Shipping & Delivery Policy</h2>

      <p className="text-center mb-5" style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
        At <span className="fw-bold text-success">GiftWalah</span>, we ensure that your orders are delivered safely and on time. 
        Our shipping policy is designed to provide a smooth and reliable shopping experience.
      </p>

      <div className="row g-4">
        {shippingInfo.map((info, index) => (
          <div key={index} className="col-12 col-md-6">
            <div className="d-flex align-items-start shadow-sm p-4 rounded">
              {info.icon}
              <div>
                <h5 className="fw-bold text-success">{info.title}</h5>
                <p style={{ fontSize: "1rem", lineHeight: "1.6", margin: 0 }}>{info.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <h5 className="fw-bold text-success mb-3">International Shipping</h5>
        <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>
          Currently, we ship within India only. For international orders, please contact our support team at <a href="mailto:Info@giftwalah.com" className="text-success text-decoration-none">Info@giftwalah.com</a>.
        </p>
      </div>
    </section>
  );
};

export default Shipping;
