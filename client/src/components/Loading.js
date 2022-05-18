import React from 'react'
import NavBar from './NavBar'

function Loading() {
  return (
    <div>
        <NavBar/>
        <div className="text-center relative w-full h-screen">
            <p className="text-6xl font-bold absolute top-[40%] left-0 right-0 mx-auto">Loading...</p>
        </div>
    </div>
  )
}

export default Loading