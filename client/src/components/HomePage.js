import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import NavBar from './NavBar';
import Signin from './Signin';

function HomePage() {
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(true);

  // Check if user is signed in
  useEffect (() => {
    axios.get("/api/user")
    .then(res => {
      console.log("Response:", res.data);
      if (!res.data.user) {
        setSignedIn(false);
        navigate("/signin");
      }
    }).catch(error => {console.log(error)})
  }, [])
  

  if(signedIn) {
    return (
      <div>
        <NavBar active="home"/>
        HomePage
      </div>
    )
  }
}

export default HomePage