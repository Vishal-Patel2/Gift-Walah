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
          height: "50vh",
          objectFit: "cover",
        }}
      />

      <style>
        {`
          @media (min-width: 768px) {
            img.img-fluid { height: 60vh; }
          }
          @media (min-width: 1200px) {
            img.img-fluid { height: 80vh; }
          }
        `}
      </style>
    </div>
  );
};

export default HeroSection;
