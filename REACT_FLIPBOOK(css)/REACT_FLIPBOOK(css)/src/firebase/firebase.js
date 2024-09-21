// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFBSahdzqn7noPdbWbRblTUsFjouzsQVs",
  authDomain: "flipbook-firebase.firebaseapp.com",
  projectId: "flipbook-firebase",
  storageBucket: "flipbook-firebase.appspot.com",
  messagingSenderId: "743973977437",
  appId: "1:743973977437:web:e85e7509b3653c9a90bcb4",
  measurementId: "G-ZBBFMY5GQD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
