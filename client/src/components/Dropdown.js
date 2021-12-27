import React from "react";
import {Link, useNavigate} from "react-router-dom";

export default function Dropdown() {
    const navigate = useNavigate();

    let logOut = () => {

        window.localStorage.setItem('userId', "")
        window.localStorage.setItem('name', "")
        window.localStorage.setItem('age', "")
        window.localStorage.setItem('studyYear', "")
        window.localStorage.setItem('profilePic', "")
        window.localStorage.setItem('department', "")
        window.localStorage.setItem('subjects', "")
        window.localStorage.setItem('studyingStyle', "")
        window.localStorage.setItem('description', "")
        window.localStorage.setItem('status', "")
        window.localStorage.setItem('availability', "")
        window.localStorage.setItem('location', "")

        fetch('/api/logout/users')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            navigate('/login')
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    return (
        <div className='bg-red-500 w-28 lg:w-40 right-0 absolute'>
            <ul className='flex flex-col text-center'>
                <Link to='/user-profile' className="sm:hidden text-white text-xl h-10 border-b border-t flex flex-col justify-center hover:text-amber-300">Profile</Link>
                <Link to='/' className="sm:hidden text-white text-xl h-10 border-b flex flex-col justify-center hover:text-amber-300">Match</Link>
                <Link to='/' className="sm:hidden text-white text-xl h-10 border-b flex flex-col justify-center hover:text-amber-300">Message</Link>
                <Link to='/' className="text-white text-xl h-10 border-b border-t flex flex-col justify-center hover:text-amber-300">Option</Link>
                <Link to='/' className="text-white text-xl h-10 border-b flex flex-col justify-center hover:text-amber-300">Option</Link>
                <li className="text-white text-xl h-10 border-b flex flex-col justify-center hover:text-amber-300 cursor-pointer" onClick={logOut}>Logout</li>
            </ul>
        </div>
    )
}