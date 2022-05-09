import React, {useState, useEffect} from 'react';
import NavBar from './NavBar';

function ViewProfile({user, owner, userPosts}) {
  return (
    <div className="pb-20">
      <NavBar active="profile"/>
      <div className="w-[92%] mt-12 mx-auto">
        <div className="flex flex-row">
          <div className="w-1/4">
            <img className="rounded-full h-96 w-96" src={user.profileImg} alt="profile img"></img>
          </div>
          <div className="flex flex-col w-3/4">
            <div className="flex flex-row text-xl lg:text-3xl">
              <div className="flex flex-col w-1/3 text-center py-6 border-b border-slate-300 shadow-inner shadow-slate-500 rounded-md"><span className="font-semibold">Name</span> <p>{user.name}</p></div>
              <div className="flex flex-col w-1/3 text-center py-6 border-l border-b border-slate-300 shadow-inner shadow-slate-500 rounded-md"><span className="font-semibold">Major</span> <p>{user.major}</p></div>
              <div className="flex flex-col w-1/3 text-center py-6 border-l border-b border-slate-300 shadow-inner shadow-slate-500 rounded-md"><span className="font-semibold">Minor</span> <p>{user.minor}</p></div>
            </div>
            <div className="flex flex-row w-full text-xl lg:text-3xl py-6 text-center border border-slate-300 shadow-inner shadow-slate-500 rounded-md">
              <div className='w-1/6'></div>
              <p className="font-semibold mr-12">Course taking: </p>
              <div className="w-fit flex flex-row flex-wrap">
                {user.courses.map((course, index) => (
                  <div key={index} className="py-2 px-3 text-lg lg:text-xl rounded-sm bg-red-500 text-white font-medium shadow-md shadow-slate-500 text-center flex flex-row mr-2">
                    {course}
                </div>
                ))}
              </div>
            </div>
            <div className="text-xl lg:text-2xl text-center mt-12 italic">{user.description}</div>
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