// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQrvIusRkExduf3bXGZRePpHVIQ_WPiMU",
  authDomain: "animoxkart-7962f.firebaseapp.com",
  projectId: "animoxkart-7962f",
  storageBucket: "animoxkart-7962f.appspot.com",
  messagingSenderId: "218901776540",
  appId: "1:218901776540:web:6410f5c192b6b887020559"
};

// Initialize Firebase
const firebaseapp= initializeApp(firebaseConfig); 
export default firebaseapp;