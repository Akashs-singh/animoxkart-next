import React, { useEffect } from "react";
import "./alert.css";

const SuccessAlert = () => {

  useEffect(() => {
    // Redirect to another page after 3 seconds
    const timer = setTimeout(() => {
     window.location.href = "/login";
    }, 3000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <h3 className="alert-title">Registration Successful</h3>
        <p className="alert-message">You will be redirected shortly...</p>
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default SuccessAlert;
