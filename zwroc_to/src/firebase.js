// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-OIxigAhotqQUEA92TgrCq8-PDxWp8jQ",
  authDomain: "zwroc-to.firebaseapp.com",
  projectId: "zwroc-to",
  storageBucket: "zwroc-to.firebasestorage.app",
  messagingSenderId: "706054849423",
  appId: "1:706054849423:web:5f298d78a8f982a45c01fa",
  measurementId: "G-H0JPH0Z8SM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
