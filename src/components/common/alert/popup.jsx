import React, { useState } from "react";
import "./alert.css";

const Popup = ({ title, message,buttonText }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="alert-overlay">
        <div className="alert-box">
          <h3 className="alert-title">{title}</h3>
          <p className="alert-message">
          {message}
          </p>

          
          <button className="alert-button" onClick={handleClose}>
          {buttonText}
          </button>
        </div>
      </div>
    )
  );
};

export default Popup;
