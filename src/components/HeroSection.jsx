import React from "react";

const HeroSection = () => {
  const banner = "https://www.portronics.com/cdn/shop/files/Corporate_Gifting_Banner_f0af93c0-63ad-417c-99cd-e694fe1cdb7a.png?v=1719557738";

  return (
    <div className="w-100 overflow-hidden">
      <img
        src={banner}
        alt="Hero Banner"
        className="img-fluid w-100"
        style={{
          width: "100%",
          height: "auto", // Height automatic for mobile
          maxHeight: "80vh", // Max height for large screens
          objectFit: "cover",
        }}
      />

      <div
        className="position-absolute top-50 start-50 translate-middle text-center text-white"
        style={{
          textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
          maxWidth: "90%",
        }}
      >
       
      </div>

      <style>
        {`
          @media (min-width: 768px) {
            img.img-fluid { max-height: 60vh; }
            .display-6 { font-size: 2rem; }
          }
          @media (min-width: 1200px) {
            img.img-fluid { max-height: 80vh; }
            .display-6 { font-size: 3rem; }
          }
        `}
      </style>
    </div>
  );
};

export default HeroSection;
