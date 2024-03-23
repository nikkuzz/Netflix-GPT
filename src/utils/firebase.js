// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCK9jbBri_kZgSDjUR4wP0A-OjxUQwzNrw",
  authDomain: "netflixgpt-31198.firebaseapp.com",
  projectId: "netflixgpt-31198",
  storageBucket: "netflixgpt-31198.appspot.com",
  messagingSenderId: "108772324574",
  appId: "1:108772324574:web:179026fd9107f02c38fe4f",
  measurementId: "G-GNRGSVEX8D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();