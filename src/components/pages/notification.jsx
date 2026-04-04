import React, { useState } from "react";
import firebaseapp from "./../firebase/firebase.js";
import { getMessaging, getToken } from "firebase/messaging";
import { Notification } from './../../common/alert/notification';

const messaging = getMessaging(firebaseapp);

const Notification = () => {
  const [showAlert, setShowAlert] = useState(true);

  const handleHideAlert = () => {
    setShowAlert(false);
  };

  const generateToken = async () => {
    // Show the alert before requesting permission
    if (showAlert) {
      return <Notification title="Notifications" onClose={handleHideAlert} />;
    }

    try {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: "BFJcoRXlQmwpaBCbWYiPqWkXfUVx1vMY3Z7DSKuUQR-7utNW2k-d0KoM1zTrI1-TN1asTWiXEuy7XP1abRW8ZdI"
        });
        // console.log(token);
        // Save the token in the database for future use
      } else {
        console.error("Permission denied for notifications");
      }
    } catch (error) {
      console.error("Error generating token:", error);
    }
  };

  return (
    <div>
      {showAlert && <Notification title="Notifications" onClose={handleHideAlert} />}
      <button onClick={generateToken}>Get Notification Token</button>
    </div>
  );
};

export default Notification;
