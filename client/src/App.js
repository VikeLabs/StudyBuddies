// import modules
import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// import files
import "./App.css";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import UserProfile from './components/UserProfile';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Message from "./components/Message";
import Matches from "./components/Matches";
import Likes from "./components/Likes";
import LikedUserProfile from "./components/LikedUserProfile";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const storage = getStorage(app);

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route element={<HomePage/>} path="/" exact></Route>
        <Route element={<Signup/>} path="/signup"></Route>
        <Route element={<Login/>} path="/login"></Route>
        <Route element={<UserProfile/>} path="/user-profile"></Route>
        <Route element={<Message/>} path="/message"></Route>
        <Route element={<Matches/>} path='/matches'></Route>
        <Route element={<Likes/>} path='/likes' exact></Route>
        <Route element={<LikedUserProfile />} path='/likes/:userId'></Route>
      </Routes>
    </Router>
  );
}

export default App;