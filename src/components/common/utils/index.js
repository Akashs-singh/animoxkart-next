import Cookies from 'js-cookie';  // To manage cookies
import jwt from 'jsonwebtoken';

// Function to get contact_id from JWT
export const getContactIdFromJWT = () => {
  // Retrieve the JWT token from cookies
  const token = Cookies.get('token');

  if (!token) {
    console.error('No JWT token found in cookies');
    return null;  // No token found, return null
  }

  try {
    // Decode the JWT token
    const decoded = jwt.decode(token);

    // Check if decoded is an object and contains contact_id
    if (decoded && decoded.contact_id) {
      return decoded.contact_id;  // Return contact_id if available
    } else {
      console.error('Contact ID not found in token payload');
      return null;  // Return null if contact_id is not found
    }
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;  // Return null in case of an error
  }
};

export const isLoggedin = (path, redirect) => {
      if (Cookies.get('token') === undefined) {
        Cookies.set('redirect', redirect);
        Cookies.set("path", path);
        // Check if we're in the browser environment
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    };