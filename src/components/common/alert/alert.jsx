import React, { useState } from "react";
import "./alert.css";

const Alert = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="alert-overlay">
        <div className="alert-box">
          <h3 className="alert-title">Warning</h3>
          <p className="alert-message">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euis.
          </p>
          <button className="alert-button" onClick={handleClose}>
            Ok
          </button>
        </div>
      </div>
    )
  );
};

export default Alert;
