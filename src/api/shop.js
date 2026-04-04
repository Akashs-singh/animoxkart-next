/**
 * Mocking client-server processing
 */

import CryptoJS from 'crypto-js';
// const  fs = require('browserify-fs');
// import _products from './data2.json'

const TIMEOUT = 100
const API_URL = 'https://api.animoxkart.com/chunk';

const getProductsFromAPI = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const { data, iv } = await response.json();
    const secret = 'animal-cat-dog-bird-fish-tree-su';

    const decrypted = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(secret), {
      iv: CryptoJS.enc.Base64.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const decodedString = CryptoJS.enc.Utf8.stringify(decrypted);
    const decoded = JSON.parse(decodedString);
    console.log("products", decoded);
    return decoded;

  } catch (error) {
    console.error('❌ Error fetching or decrypting products:', error);
    return [];
  }
};
const API_URL2 = 'https://api.animoxkart.com/chunk-js';
const getTagsFromAPI = async () => {

  try {
    const response = await fetch(API_URL2);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const { data, iv } = await response.json();
    const secret = 'animal-cat-dog-bird-fish-tree-su';

    const decrypted = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(secret), {
      iv: CryptoJS.enc.Base64.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const decodedString = CryptoJS.enc.Utf8.stringify(decrypted);
    const decoded = JSON.parse(decodedString);
    console.log("tags",decoded);
    return decoded;

  } catch (error) {
    console.error('❌ Error fetching or decrypting products:', error);
    return [];
  }
};

export default {
  // getTags: (cb, timeout) => setTimeout(() => cb(_tags), timeout || TIMEOUT),
   getTags: (cb, timeout) => {
    getTagsFromAPI().then(tags => {
      setTimeout(() => cb(tags), timeout || TIMEOUT);
    });
  },
  getProducts: (cb, timeout) => {
    getProductsFromAPI().then(products => {
      setTimeout(() => cb(products), timeout || TIMEOUT);
    });
  },
  buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT),
};

// export default {
//     // getProducts: (cb, timeout) => setTimeout(() => cb(_products), timeout || TIMEOUT),
//     getProducts: (cb, timeout) => {
//         getProductsFromAPI().then(products => {
//           setTimeout(() => cb(products), timeout || TIMEOUT);
//         });
//       },
//     buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT)
// }
