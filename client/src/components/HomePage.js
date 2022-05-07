import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(true);

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
  

  // if(signedIn) {
    return (
      <div>HomePage</div>
    )
  // }
}

export default HomePage