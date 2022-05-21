import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import NavBar from './NavBar';
import AddPostBtn from './AddPostBtn';
import AddPostView from './AddPostView';
import Loading from './Loading';

function HomePage() {
  // Set the initial number of users per screen
  let num = 0;
  let width = window.innerWidth;
  if (width < 640) {
    num = 1;
  } else if (width >= 640 && width <= 767) {
    num = 1;
  } else if (width >= 768 && width <= 1023) {
    num = 2;
  } else if (width >= 1024 && width <= 1279) {
    num = 2;
  } else if (width >= 1280 && width <= 1535) {
    num = 3;
  } else {
    num = 4;
  }
  // Users being shown on the screen
  const [userNumPerScreen, setUserNumPerScreen] = useState(num);
  const [showIndex, setShowIndex] = useState(0);
  const [usersShowList, setUsersShowList] = useState([]);
  
  const [signedIn, setSignedIn] = useState(true);
  const [addPostWindow, setAddPostWindow] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersList, setUsersList] = useState([])
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  
  // Check if user is signed in
  useEffect (() => {
    const handleResize = () => {
      let width = window.innerWidth;
      if (width < 640) {
        setUserNumPerScreen(1);
      } else if (width >= 640 && width <= 767) {
        setUserNumPerScreen(1);
      } else if (width >= 768 && width <= 1023) {
        setUserNumPerScreen(2)
      } else if (width >= 1024 && width <= 1279) {
        setUserNumPerScreen(2);
      } else if (width >= 1280 && width <= 1535) {
        setUserNumPerScreen(3);
      } else {
        setUserNumPerScreen(4);
      }
    }

    handleResize();

    axios.get("/api/user")
    .then(res => {
      if (!res.data.user) {
        setSignedIn(false);
        navigate("/signin");
      } else {
        axios.get("/api/other-users")
        .then(res => {
          setLoading(false);
          if (res.data.users) {
            setUsers(res.data.users);
            const usersData = res.data.users;
            let usersNum = 0;
            let usersList = [];
            let usersListList = [];
            for (let i = 0; i < usersData.length; i++) {
              usersList.push(usersData[i]);
              usersNum++;
              if (usersNum === userNumPerScreen || i === usersData.length - 1) {
                usersNum = 0;
                usersListList.push(usersList);
                usersList = []
              }
            }
            setUsersList(usersListList);
          }
        })
        .catch(usersError => {
          console.log(usersError);
        })
      }
    }).catch(error => {console.log(error)})

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  useEffect(() => {
            const usersData = users;
            let usersNum = 0;
            let usersList = [];
            let usersListList = [];
            for (let i = 0; i < usersData.length; i++) {
              usersList.push(usersData[i]);
              usersNum++;
              if (usersNum === userNumPerScreen || i === usersData.length - 1) {
                usersNum = 0;
                usersListList.push(usersList);
                usersList = []
              }
            }
            setUsersList(usersListList);
  }, [userNumPerScreen])

  const moveUsersSlider = direction => {
    if (direction === "right") {
      setShowIndex(showIndex + 1);
    } else {
      if (showIndex > 0) {
        setShowIndex(showIndex - 1);
      }
    }
  }
  
  if (loading) {
    return (<Loading></Loading>)
  } else {
    if(signedIn) {
      return (
        <div className="bg-slate-200 min-h-screen pb-20 min-w-screen">
          <NavBar active="home"/>
          {addPostWindow ? (<AddPostView cancel={() => {setAddPostWindow(false)}}/>) : (<div></div>)}
          <div className="pt-12 w-[95%] mx-auto">
            <h1 className="text-3xl text-gray-500 font-semibold">Users you might know</h1>
            <div className="mt-4 w-fit mx-auto flex flex-row">
              <div className="text-5xl font-bold text-slate-400 w-fit h-fit my-auto mx-auto mr-4 lg:mr-12 cursor-default hover:text-slate-700 duration-200" onClick={() => {moveUsersSlider("left")}}>&#60;</div>
              {usersList[showIndex % usersList.length].map((user, index) => (
                <div id={index} className="mr-4 w-80 h-160 bg-white rounded-md shadow-md shadow-slate-50">
                  <img className="w-full h-[60%]" src={user.profileImg} alt="profile img" onClick={() => {navigate(`/user-profile/${user.id}`)}}/>
                  <div className="w-[90%] mx-auto mt-2">
                    <h1 className="font-semibold text-3xl hover:underline cursor-default" onClick={() => {navigate(`/user-profile/${user.id}`)}}>{user.name}</h1>
                    <p className="text-xl mt-2"><span className="font-semibold">Major: </span>{user.major}</p>
                    <p className="text-xl"><span className="font-semibold">Minor: </span>{user.minor}</p>
                    <div className="text-xl flex flex-row">
                      <p className="font-semibold mr-4">Courses: </p>
                      <div className="mt-2 w-fit flex flex-row flex-wrap">
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
              <div className="text-5xl font-bold text-slate-400 w-fit h-fit my-auto mx-auto ml-2 lg:ml-8 cursor-default hover:text-slate-700 duration-200" onClick={() => {moveUsersSlider("right")}}>&#62;</div>
            </div>
          </div>
          <AddPostBtn pressed={() => {setAddPostWindow(true)}}/>
        </div>
      )
    }
  }
}

export default HomePage