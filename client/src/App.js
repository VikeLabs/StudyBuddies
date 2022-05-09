import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import HomePage from "./components/HomePage";
import Signin from "./components/Signin";
import UserProfile from "./components/UserProfile";

// firebase storage configuration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "vikes-study-buddy.firebaseapp.com",
  projectId: "vikes-study-buddy",
  storageBucket: "vikes-study-buddy.appspot.com",
  messagingSenderId: "145376806279",
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/user-profile" element={<UserProfile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
