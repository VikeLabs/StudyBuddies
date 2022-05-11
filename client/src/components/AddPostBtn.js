import React from 'react'

function AddPostBtn({pressed}) {
  return (
    <div className="text-3xl font-bold bg-indigo-700 hover:bg-indigo-900 duration-200 text-white w-16 h-16 rounded-full absolute bottom-10 right-10 xl:right-20 text-center flex flex-col justify-center cursor-default" onClick={pressed}>+</div>
  )
}

export default AddPostBtn