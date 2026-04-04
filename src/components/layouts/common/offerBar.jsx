import React, { useEffect, useState } from "react";

const offers = [
  {
    text: "Get Extra ₹200 OFF on all orders above ₹899",
    code: "SAVE200",
  },
  {
    text: "Flat 15% OFF on orders above ₹1499",
    code: "FLAT15",
  },
  {
    text: "Free Delivery on orders above ₹499",
    code: "FREEDEL",
  },
];

const OfferSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 3000); // change every 3 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.slider,
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {offers.map((offer, index) => (
          <div key={index} style={styles.slide}>
            <span>{offer.text}</span>
            <span style={styles.code}>Use Code: {offer.code}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    overflow: "hidden",
    width: "100%",
    background: "linear-gradient(to right, #f8a5a5, #f5c6c6)",
  },
  slider: {
    display: "flex",
    transition: "transform 0.5s ease-in-out",
  },
  slide: {
    minWidth: "100%",
    padding: "12px 20px",
    textAlign: "center",
    fontWeight: "500",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
    fontSize: "14px",
    lineHeight: "1.5",
  },
  code: {
    backgroundColor: "#f1bcbc",
    padding: "4px 10px",
    borderRadius: "12px",
    fontWeight: "600",
    whiteSpace: "nowrap",
    display: "inline-block",
  },
};

export default OfferSlider;