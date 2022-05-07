import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import HomePage from "./components/HomePage";
import Signin from "./components/Signin";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route path="/signin" element={<Signin/>}/>
      </Routes>
    </Router>
  );
}

export default App;
