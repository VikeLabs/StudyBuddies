import axios from 'axios';
import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";

function Signin() {
  const [signInProcess, setSignInProcess] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onEmailChange = e => {
    setEmail(e.target.value);
  }

  const onPasswordChange = e => {
    setPassword(e.target.value);
  }

  const onConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value);
  }

  const signUp = e => {
    e.preventDefault();
    if (email === "") {
      setError("Email cannot be empty")
    } else if (password === "") {
      setError("Password cannot be empty")
    } else if (password.length < 8) {
      setError("Password has to be at least 8 characters");
    } else if (password !== confirmPassword) {
      setError("Passwords don't match")
    } else {
      setError("");
      axios.post("/api/signup", {
        email: email,
        password: password
      })
      .then(res => {
        if (res.data.signedIn) {
          navigate("/");
        } else {
          setError("Sign up failed. Please try again.")
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

  const signIn = e => {
    e.preventDefault();
    if (email === "") {
      setError("Email cannot be empty")
    } else if (password === "") {
      setError("Password cannot be empty")
    } else if (password.length < 8) {
      setError("Password has to be at least 8 characters");
    } else {
      setError("");
      axios.post("/api/signin", {
        email: email,
        password: password
      })
      .then(res => {
        if (res.data.signedIn) {
          navigate("/");
        } else {
          setError("Invalid email or password.")
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

  if (signInProcess) {
    return (
      <div className='w-screen h-screen bg-slate-200 text-center'>
          <h1 className="text-3xl lg:text-5xl font-bold pt-72">Let's find youthe perfect study buddy</h1>
          <form className="w-10/12 md:w-7/12 lg:w-6/12 xl:w-1/3 mx-auto bg-white mt-8 rounded-md shadow-slate-500 shadow-md" onSubmit={signIn}>
              {error !== "" ? (<p className="w-[92%] mx-auto font-normal text-2xl pt-6 text-red-500">{error}</p>) : (<div></div>)}
              <input className='w-[92%] mx-auto mt-6 px-6 py-3 rounded-md border-2 border-slate-500 text-xl bg-blue-100' type="email" value={email} placeholder='Email' onChange={onEmailChange}></input>
              <input className='w-[92%] mx-auto mt-4 px-6 py-3 rounded-md border-2 border-slate-500 text-xl bg-blue-100' type="password" value={password} placeholder='Password' onChange={onPasswordChange}></input>
              <p className="w-[92%] mx-auto font-semibold text-xl mt-4">Do not have an account? Click <span className="font-bold underline cursor-default" onClick={() => {setSignInProcess(false); setError(""); setEmail(""); setPassword(""); setConfirmPassword("")}}>here</span> to sign up</p>
              <input className='w-[92%] mx-auto mt-4 mb-4 px-6 py-3 rounded-md border-2 border-red-500 text-xl bg-red-500 hover:bg-red-700 text-white text-center font-bold text-2xl' type="submit" value="Sign In"></input>
          </form>
      </div>
    )
  } else {
    return (
      <div className='w-screen h-screen bg-slate-200 text-center'>
          <h1 className="text-3xl lg:text-5xl font-bold pt-72">Let's find youthe perfect study buddy</h1>
          <form className="w-10/12 md:w-7/12 lg:w-6/12 xl:w-1/3 mx-auto bg-white mt-8 rounded-md shadow-slate-500 shadow-md" onSubmit={signUp}>
              {error !== "" ? (<p className="w-[92%] mx-auto font-normal text-2xl pt-6 text-red-500">{error}</p>) : (<div></div>)}
              <input className='w-[92%] mx-auto mt-6 px-6 py-3 rounded-md border-2 border-slate-500 text-xl bg-blue-100' type="email" value={email} placeholder='Email' onChange={onEmailChange}></input>
              <input className='w-[92%] mx-auto mt-4 px-6 py-3 rounded-md border-2 border-slate-500 text-xl bg-blue-100' type="password" value={password} placeholder='Password' onChange={onPasswordChange}></input>
              <input className='w-[92%] mx-auto mt-4 px-6 py-3 rounded-md border-2 border-slate-500 text-xl bg-blue-100' type="password" value={confirmPassword} placeholder='Confirm Password' onChange={onConfirmPasswordChange}></input>
              <p className="w-[92%] mx-auto font-semibold text-xl mt-4">Already have an account? Click <span className="font-bold underline cursor-default" onClick={() => {setSignInProcess(true); setError(""); setEmail(""); setPassword(""); setConfirmPassword("")}}>here</span> to sign in</p>
              <input className='w-[92%] mx-auto mt-4 mb-4 px-6 py-3 rounded-md border-2 border-red-500 text-xl bg-red-500 hover:bg-red-700 text-white text-center font-bold text-2xl' type="submit" value="Sign Up"></input>
          </form>
      </div>
    )
  }
  
}

export default Signin