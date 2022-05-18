import axios from 'axios'
import React, {useState, useEffect} from 'react'
import UserProfileBuilder from './UserProfileBuilder';
import ViewProfile from './ViewProfile';
import {useNavigate, useParams} from "react-router-dom";
import Loading from './Loading';

function UserProfile() {
  const [signedIn, setSignedIn] = useState(true);
  const [userProfileFound, setUserProfileFound] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [owner, setOwner] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  let { id } = useParams();

  // check if user is signed in
  useEffect (() => {
      axios.get("/api/user")
      .then(res => {
        console.log("Response:", res.data);
        if (!res.data.user) {
          setSignedIn(false);
          navigate("/signin");
        } else {
          if (!id) {
            axios.get("/api/user-profile", {
              params: {
                owner: true
              }
            })
            .then(res => {
              setLoading(false);
              if (res.data.profile) {
                setUserProfileFound(true);
                setUserProfile(res.data.profile);
              }
            })
            .catch(profileError => {
              console.log(profileError);
            })
          } else {
            // console.log("id:", id)
            setOwner(false);
            axios.get(`/api/user-profile/${id}`)
            .then(res => {
              setLoading(false);
              if (res.data.profile) {
                setUserProfileFound(true);
                setUserProfile(res.data.profile);
              }
            })
            .catch(error => {
              console.log(error)
            })
          }
        }
      }).catch(error => {console.log(error)})
  }, [])

  if (loading) {
    return (<Loading/>)
  } else {
    if (signedIn) {
      if (userProfileFound) {
        return (
          <ViewProfile user={userProfile} owner={owner} edit={() => {setUserProfileFound(false)}}/>
        )
      } else {
        if (userProfile) {
          return (
            <UserProfileBuilder user={userProfile} edit={true} show={() => {setUserProfileFound(true)}}/>
          )
        } else {
          return (
            <UserProfileBuilder user={null} edit={false} show={() => {setUserProfileFound(true)}}/>
          )
        }
        
      }
    }
  }
  
}

export default UserProfile