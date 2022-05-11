import React, {useState, useEffect} from 'react';
import NavBar from './NavBar';
import {BsFillPenFill} from "react-icons/bs";

function ViewProfile({user, owner, userPosts, edit}) {
  return (
    <div className="pb-20">
      <NavBar active="profile"/>
      <div className="w-[92%] mt-12 mx-auto">
        <div className="flex flex-col xl:flex-row w-11/12 xl:w-full mx-auto">
          <div className="w-full text-center xl:w-1/4">
            <img className="rounded-full h-80 w-80 my-auto mx-auto" src={user.profileImg} alt="profile img"></img>
          </div>
          <div className="flex flex-col w-full mt-8 xl:mt-0 xl:w-2/3 xl:ml-8">
            <div className="flex flex-row text-xl xl:text-3xl">
              <div className="flex flex-col w-1/3 text-center py-6 border-b border-slate-300 shadow-inner shadow-slate-500 rounded-md"><span className="font-semibold">Name</span> <p>{user.name}</p></div>
              <div className="flex flex-col w-1/3 text-center py-6 border-l border-b border-slate-300 shadow-inner shadow-slate-500 rounded-md"><span className="font-semibold">Major</span> <p>{user.major}</p></div>
              <div className="flex flex-col w-1/3 text-center py-6 border-l border-b border-slate-300 shadow-inner shadow-slate-500 rounded-md"><span className="font-semibold">Minor</span> <p>{user.minor}</p></div>
            </div>
            <div className="flex flex-row w-full text-xl xl:text-3xl py-6 text-center border border-slate-300 shadow-inner shadow-slate-500 rounded-md">
              <div className='w-1/12 xl:w-1/6'></div>
              <p className="font-semibold mr-12 my-1">Course taking: </p>
              <div className="w-fit flex flex-row flex-wrap">
                {user.courses.map((course, index) => (
                  <div key={index} className="my-1 py-2 px-3 text-lg lg:text-xl rounded-sm bg-red-500 text-white font-medium shadow-md shadow-slate-500 text-center flex flex-row mr-2">
                    {course}
                </div>
                ))}
              </div>
            </div>
            <div className="text-xl lg:text-2xl text-center mt-12 italic">{user.description}</div>
            {owner ? (<div className="text-3xl w-16 h-16 ml-auto mr-12 mt-8 rounded-full bg-slate-300 hover:bg-slate-500 duration-200 flex flex-col justify-center" onClick={edit}>
              <BsFillPenFill className="mx-auto"/>
            </div>) : (<div></div>)}
          </div>
        </div>
        <div className="mt-12 border-t border-slate-300">
          <h1 className="text-2xl lg:text-4xl font-bold pt-4">Posts</h1>
          {!userPosts ? (<div className="text-center mt-12 lg:mt-20 text-xl lg:text-2xl">This user has no posts</div>) : (<div></div>)}
        </div>
      </div>
    </div>
  )
}

export default ViewProfile