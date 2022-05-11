import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import NavBar from './NavBar';
import AddPostBtn from './AddPostBtn';
import AddPostView from './AddPostView';

function HomePage() {
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(true);
  const [addPostWindow, setAddPostWindow] = useState(false);
  const [users, setUsers] = useState([]);

  // Check if user is signed in
  useEffect (() => {
    axios.get("/api/user")
    .then(res => {
      console.log("Response:", res.data);
      if (!res.data.user) {
        setSignedIn(false);
        navigate("/signin");
      } else {
        axios.get("/api/other-users")
        .then(res => {
          if (res.data.users) {
            setUsers(res.data.users);
          }
        })
        .catch(usersError => {
          console.log(usersError);
        })
      }
    }).catch(error => {console.log(error)})
  }, [])
  

  if(signedIn) {
    return (
      <div>
        <NavBar active="home"/>
        {addPostWindow ? (<AddPostView cancel={() => {setAddPostWindow(false)}}/>) : (<div></div>)}
        <div className="pt-12 w-[95%] mx-auto">
          <h1 className="text-3xl text-gray-400 font-semibold">Users you might know</h1>
          <div></div>
        </div>
        <AddPostBtn pressed={() => {setAddPostWindow(true)}}/>
      </div>
    )
  }
}

export default HomePage