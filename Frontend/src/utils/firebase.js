// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwiXcKd1JLisFgej65J1IOkPH4XFKY0-0",
  authDomain: "travo-f5e1e.firebaseapp.com",
  projectId: "travo-f5e1e",
  storageBucket: "travo-f5e1e.firebasestorage.app",
  messagingSenderId: "935491781824",
  appId: "1:935491781824:web:d9c4ca4a3add62a52e5925",
  measurementId: "G-LF7MFFPBYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);