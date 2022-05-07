import axios from 'axios'
import React from 'react'
import {useNavigate} from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const signOut = () => {
    axios.get("/api/signout")
    .then(res => {
      navigate("/signin");
    })
    .catch(error => {console.log(error)});
  }

  return (
    <div className="w-full h-16 lg:h-20 bg-red-500 flex flex-row shadow-md shadow-slate-500">
      <h1 className="text-3xl lg:text-4xl font-bold text-yellow-300 my-auto ml-4 cursor-default" onClick={() => {navigate("/")}}>Study Buddy</h1>
      <div className='hidden lg:block lg:w-1/1/6 xl:w-1/4'></div>
      <div className="flex flex-row w-1/3 text-white xl:text-2xl font-normal">
        <div className='w-1/4 text-center flex flex-col justify-center cursor-default hover:shadow-md hover:shadow-white duration-200 hover:font-bold' onClick={() => {navigate("/")}}>Home</div>
        <div className='w-1/4 text-center flex flex-col justify-center cursor-default hover:shadow-md hover:shadow-white duration-200 hover:font-bold' onClick={() => {navigate("/user-profile")}}>Profile</div>
        <div className='w-1/4 text-center flex flex-col justify-center cursor-default hover:shadow-md hover:shadow-white duration-200 hover:font-bold'>Requests</div>
        <div className='w-1/4 text-center flex flex-col justify-center cursor-default hover:shadow-md hover:shadow-white duration-200 hover:font-bold'>Message</div>
      </div>
      <div className="text-xl font-semibold text-white ml-auto mr-4 lg:mr-8 px-4 py-2 bg-red-700 hover:bg-red-900 hover:shadow-inner hover:shadow-red-900 duration-200 cursor-default rounded-sm w-fit h-fit my-auto" onClick={signOut}>Log out</div>
    </div>
  )
}

export default NavBar