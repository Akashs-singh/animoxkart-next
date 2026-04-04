import React, { useState } from "react";
import "./notification.css";

const Notifications = ({ title, message, buttonText }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    salesOffers: false,
    productAlerts: false
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prevNotifications) => ({
      ...prevNotifications,
      [name]: checked
    }));
  };

  return (
    isOpen && (
      <div className="alert-overlay">
        <div className="alert-box">
          <h3 className="alert-title">{title}</h3>
            <br />
          {/* Checkboxes for notifications */}
          <div className="notification-options">
            <label>
              <input
                type="checkbox"
                name="orderUpdates"
                checked={notifications.orderUpdates}
                onChange={handleCheckboxChange}
              />
               &nbsp;Important Alerts & Order Updates
            </label>
            <label>
              <input
                type="checkbox"
                name="salesOffers"
                checked={notifications.salesOffers}
                onChange={handleCheckboxChange}
              />
               &nbsp;Exclusive Sales, Discounts & Offers
            </label>
            <label>
              <input
                type="checkbox"
                name="productAlerts"
                checked={notifications.productAlerts}
                onChange={handleCheckboxChange}
              />
               &nbsp;New Product Launches & Restocks
            </label>
          </div>

          <button className="alert-button" onClick={handleClose}>
            {buttonText}
          </button>
        </div>
      </div>
    )
  );
};

export default Notifications;
