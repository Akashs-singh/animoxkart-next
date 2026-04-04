'use client'
import React, { useEffect } from "react";
import "./alert.css";

const CustomAlert = ({ title, message, path, time }) => {

  useEffect(() => {
    // Redirect to the specified path after the provided time
    const timer = setTimeout(() => {
      window.location.href = path;
    }, time);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [path, time]);

  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <h3 className="alert-title">{title}</h3>
        <p className="alert-message">{message}</p>
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default CustomAlert;
