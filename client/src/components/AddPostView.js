import axios from 'axios'
import React, {useState} from 'react'

function AddPostView({cancel}) {
  const [error, setError] = useState("")
  const [need, setNeed] = useState("Tutoring");
  const [deadline, setDeadline] = useState(null);
  const [description, setDescription] = useState("");

  const onNeedChange = e => {
    setNeed(e.target.value);
  }

  const onDeadlineChange = e => {
    setDeadline(e.target.value);
  }

  const onDescriptionChange = e => {
    setDescription(e.target.value);
  }

  const submitPost = e => {
    e.preventDefault();
    if (!deadline) {
      setError("Please pick a deadline for this post. After this deadline, the post will be deleted");
    } else if (description === "") {
      setError("Please provide a short description of the expected work needs to be done.")
    } else {
      // console.log("Deadline: ", new Date(deadline).getTime());
      const newPost = {
        need: need,
        deadline: new Date(deadline).getTime(),
        description: description
      }
      axios.post("/api/add-post", newPost)
      .then(res => {
        if (res.data.success) {
          cancel();
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

  return (
    <div>
      <div className="z-40 w-full h-full bg-black opacity-50 absolute top-0 left-0"></div>
      <form className="z-50 absolute left-0 right-0 mx-auto top-[25%] w-5/6 xl:w-1/3 bg-white text-md xl:text-xl pb-4 rounded-sm" onSubmit={submitPost}>
        <div className="w-[93%] mx-auto">
        <h1 className="text-black text-6xl font-bold mt-2">Post</h1>
        {error !== "" ? (<p className="px-4 py-2 border border-red-700 text-red-700 rounded-sm mt-8 bg-red-100 w-fit">{error}</p>) : (<div></div>)}
        <div className="flex flex-row mx-auto mt-8">
            <label className="py-1 mr-4 font-semibold text-xl">Need:</label>
            <select className="px-4 py-1 rounded-sm border border-black" defaultValue="tutor" onChange={onNeedChange}>
              <option value="Tutoring">Tutoring</option>
              <option value="Looking for group">Looking for group</option>
              <option value="Help with homework/assignment">Help with homework/assignment</option>
              <option value="Looking for casual study partner">Looking for casual study partner</option>
            </select>
        </div>
        <div className="flex flex-row mt-4">
          <label className="py-1 mr-4 font-semibold text-xl">Deadline:</label>
          <input className="px-4 py-1 rounded-sm border border-black" type="date" onChange={onDeadlineChange}></input>
        </div>
        <div className="flex flex-col mt-4">
          <label className="py-1 mr-4 font-semibold text-xl">Description:</label>
          <textarea className="px-4 py-1 rounded-sm border border-black mt-2 w-full h-40" type="text" placeholder="Enter a short description of what you're hoping to get done" onChange={onDescriptionChange}></textarea>
        </div>
        <div className="flex flex-row ml-auto mr-8 w-fit mt-8">
          <div className="bg-red-500 hover:bg-red-900 duration-200 text-white text-2xl font-semibold text-center w-24 py-1 rounded-sm cursor-default opacity-80" onClick={cancel}>Cancel</div>
          <input className="bg-red-600 hover:bg-red-900 duration-200 text-white text-2xl font-semibold text-center w-24 py-1 rounded-sm ml-6" type="submit" value="Post"></input>
        </div>
        </div>
      </form>
    </div>
  )
}

export default AddPostView