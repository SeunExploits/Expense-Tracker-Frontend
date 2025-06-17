// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIFovZGj0L2DuSKHj3hz3r_I8AZ2Ebehc",
  authDomain: "expense-tracker-ba4e8.firebaseapp.com",
  projectId: "expense-tracker-ba4e8",
  storageBucket: "expense-tracker-ba4e8.firebasestorage.app",
  messagingSenderId: "389628950875",
  appId: "1:389628950875:web:4273c44c24bf121947027e",
  measurementId: "G-6TMEPGV503"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };