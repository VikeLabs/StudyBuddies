import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import NavBar from './NavBar';
import AddPostBtn from './AddPostBtn';
import AddPostView from './AddPostView';
import Loading from './Loading';

function HomePage() {
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(true);
  const [addPostWindow, setAddPostWindow] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
          setLoading(false);
          if (res.data.users) {
            console.log(res.data.users);
            setUsers(res.data.users);
          }
          console.log("Users React: ", users);
        })
        .catch(usersError => {
          console.log(usersError);
        })
      }
    }).catch(error => {console.log(error)})
  }, [])
  
  if (loading) {
    return (<Loading></Loading>)
  } else {
    if(signedIn) {
      return (
        <div className="bg-slate-200 min-h-screen">
          <NavBar active="home"/>
          {addPostWindow ? (<AddPostView cancel={() => {setAddPostWindow(false)}}/>) : (<div></div>)}
          <div className="pt-12 w-[95%] mx-auto">
            <h1 className="text-3xl text-gray-500 font-semibold">Users you might know</h1>
            <div className="mt-4 w-full flex flex-row flex-wrap">
              {users.map((user, index) => (
                <div id={index} className="mr-4 w-80 min-h-128 bg-white rounded-md shadow-md shadow-slate-500">
                  <img className="w-full h-[60%]" src={user.profileImg} alt="profile img" onClick={() => {navigate(`/user-profile/${user.id}`)}}/>
                  <div className="w-[90%] mx-auto mt-2">
                    <h1 className="font-semibold text-3xl hover:underline cursor-default" onClick={() => {navigate(`/user-profile/${user.id}`)}}>{user.name}</h1>
                    <p className="text-xl mt-2"><span className="font-semibold">Major: </span>{user.major}</p>
                    <p className="text-xl"><span className="font-semibold">Minor: </span>{user.minor}</p>
                    <div className="text-xl flex flex-row">
                      <p className="font-semibold mr-4">Courses: </p>
                      <div className="w-fit flex flex-row flex-wrap">
                        {user.courses.map((course, index) => (
                          <div key={index} className="my-1 py-1 px-2 text-base rounded-sm bg-red-500 text-white font-medium shadow-md shadow-slate-500 text-center flex flex-row mr-2">
                            {course}
                        </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <AddPostBtn pressed={() => {setAddPostWindow(true)}}/>
        </div>
      )
    }
  }
}

export default HomePage