import axios from 'axios'
import React, {useState, useEffect} from 'react'
import UserProfileBuilder from './UserProfileBuilder';
import ViewProfile from './ViewProfile';
import {useNavigate} from "react-router-dom";

function UserProfile() {
  const [signedIn, setSignedIn] = useState(true);
  const [userProfileFound, setUserProfileFound] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  // check if user is signed in
  useEffect (() => {
    axios.get("/api/user")
    .then(res => {
      console.log("Response:", res.data);
      if (!res.data.user) {
        setSignedIn(false);
        navigate("/signin");
      } else {
        axios.get("/api/user-profile", {
          params: {
            owner: true
          }
        })
        .then(res => {
          console.log("Response for user profile")
          if (res.data.profile) {
            setUserProfileFound(true);
            setUserProfile(res.data.profile);
          }
        })
        .catch(profileError => {
          console.log(profileError);
        })
      }
    }).catch(error => {console.log(error)})
  }, [])

  if (signedIn) {
    if (userProfileFound) {
      return (
        <ViewProfile user={userProfile} owner={true}/>
      )
    } else {
      return (
        <UserProfileBuilder/>
      )
    }
  }
  
}

export default UserProfile