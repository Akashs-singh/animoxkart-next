import firebaseapp from "./../firebase.js"
import { getMessaging, getToken } from "firebase/messaging";
import Cookies from 'js-cookie';
import { getContactIdFromJWT } from '../../common/utils/index';
export const messaging = getMessaging(firebaseapp);

export const generateToken = async () => {
    const permission = await Notification.requestPermission();
    if (permission == 'granted') {
        const token = await getToken(messaging, {
            vapidKey: "BFJcoRXlQmwpaBCbWYiPqWkXfUVx1vMY3Z7DSKuUQR-7utNW2k-d0KoM1zTrI1-TN1asTWiXEuy7XP1abRW8ZdI"
        })
        // send token to server
        try {
            let contact_id = "unregistered";
            if (Cookies.get('token') !== undefined) {
                contact_id = getContactIdFromJWT();
            }   
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL_NEW + '/save-notifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, contact_id })
            })
        } catch (error) {
            console.error('Error subscribing to notifications:', error)
        }

    }
  
}

export const notificationEnabled = () => {
    if (Notification.permission === 'granted') {
        return true
    } else {
        return false
    }
}

