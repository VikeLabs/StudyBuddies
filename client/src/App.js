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

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="user-profile" element={<UserProfile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
