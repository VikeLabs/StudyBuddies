import axios from 'axios';
import React, {useState, useEffect} from 'react';
import imageCompression from "browser-image-compression";
import NavBar from './NavBar';
import {useNavigate} from "react-router-dom";

function UserProfileBuilder() {
    const [imgPreview, setImgPreview] = useState();
    const [img, setImg] = useState();
    const [majorSearch, setMajorSearch] = useState("");
    const [majorDropdown, setMajorDropdown] = useState([]);
    const [selectedMajor, setSelectedMajor] = useState("");
    const [minorSearch, setMinorSearch] = useState("");
    const [minorDropdown, setMinorDropdown] = useState([]);
    const [selectedMinor, setSelectedMinor] = useState("");
    const [courseList, setCourseList] = useState([]);
    const [course, setCourse] = useState("");
    const [signedIn, setSignedIn] = useState(true);
    const navigate = useNavigate();

    // Arrays contain all majors and minors
    const allMajors = ["Commerce", "Economics", "Law", "Child and Youth Care", "Health Information Science", "Indigenous Language Revitalization", "Physical and Health Education", "Recreation and Health Education", "Teacher Education: Elementary Curriculum", "Teacher Education: Elementary Curriculum (post-degree professional program)", "Teacher Education: Secondary Curriculum (post-degree professional program)", "Biology and Mathematics and Statistics", "Biomedical Engineering", "Chemistry and Mathematics", "Civil Engineering", "Computer Engineering", "Computer Science", "Computer Science and Health Information Science", "Computer Science and Mathematics", "Computer Science and Statistics", "Electrical Engineering", "Engineering", "Financial Mathematics and Economics", "Mathematics", "Mathematics and Statistics", "Mechanical Engineering", "Music and Computer Science", "Physics and Computer Science", "Physics and Eartch Sciences (Geophysics)", "Physics and Mathematics", "Psychology and Computer Science", "Software Engineering", "Statistics", "Visual Arts and Computer Science", "Astronomy", "Biochemistry", "Biochemistry and Chemistry", "Biology", "Biology and Eartch Sciences", "Biology and Psychology", "Chemistry and Ocean Sciences", "Earth Sciences", "Environmental Studies", "Geography and Computer Science (Geomatics)", "Physical Geography and Earth and Ocean Sciences", "Physics and Astronomy", "Physics and Biochemistry", "Physics and Earth Sciences (Geophysics)", "Physics and Ocean Sciences (Ocean-Atmosphere Sciences)", "Art History and Visual Studies", "Music", "Theatre", "Visual Arts", "Writing", "Chemistry and Earth Sciences", "Chemistry for the Medical Sciences", "Health and Community Services", "Kinesiology", "Microbiology", "Microbiology and Chemistry", "Nursing", "Psychology", "Indigenous Studies", "Social Work", "Applied Linguistics", "English", "French", "Geography", "Germanic Studies", "Greek and Latin Language and Literature", "Greek and Roman Studies", "Hispanic Studies", "Latin American Interdisciplinary Studies", "Latin American Literary and Cultural Studies", "Linguistics", "Medieval Studies", "Pacific and Asian Studies", "Philosophy", "Religion, Culture and Society", "Slavic Studies (Russian and Ukrainian)", "Anthropology", "Gender Studies", "Political Science", "Sociology", "Chemistry", "Physics"];
    const allMinors = ["Applied Ethics", "Business", "Economics", "Global Development Studies", "Public Administration", "Education", "Computer Science", "Computer Systems", "Data Science", "Electrical Systems", "Mathematics", "Mechanical Systems", "Software Development", "Statistics", "Astronomy", "Coastal Studies", "Environmental Studies", "Geographic Information Technology", "Human Dimensions of Climate Change", "Microbiology", "Ocean Sciences", "Art History and Visual Studies", "Creative Writing", "Digital and Interactive Media in the Arts", "Film Studies", "Museum Studies", "Music", "Professional Communication", "Professional Writing in Journalism and Publishing", "Technology and Society", "Theatre", "Visual Arts", "History", "Indigenous Studies", "Arts of Canada", "Chinese Studies", "English", "European Studies", "French", "Germanic Studies", "Greek and Latin Language and Literature", "Greek and Roman Studies", "Hispanic Studies", "Japanese Studies", "Latin American Interdisciplinary Studies", "Latin American Literary and Cultural Studies", "Linguistics", "Medieval Studies", "Pacific and Asian Studies", "Philosopy", "Religion, Culture and Society", "Slavic Studies (Russian and Ukrainian)", "Southeast Asian Studies", "Anthropology", "Gender Studies", "Political Science", "Psychology", "Social Justice Studies", "Sociology", "Geography", "Physics"]
    
    // check if user is signed in
    useEffect (() => {
        axios.get("/api/user")
        .then(res => {
          console.log("Response:", res.data);
          if (!res.data.user) {
            setSignedIn(false);
            navigate("/signin");
          }
        }).catch(error => {console.log(error)})
      }, [])

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!img) {
            setImgPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(img)
        setImgPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [img])

    // Allowing users to search for major
    useEffect(() => {
        if (majorSearch === "") {
            setMajorDropdown([]);
            return
        }
        if (selectedMajor === "") {
            let matchedMajors = [];
            for (let i = 0; i < allMajors.length; i++) {
                if (allMajors[i].toLocaleLowerCase().includes(majorSearch.toLocaleLowerCase())) {
                    matchedMajors.push(allMajors[i]);
                }
            }
            setMajorDropdown(matchedMajors);
        } else {
            setMajorDropdown([]);
        }
    }, [majorSearch])

    // Allowing users to search for minor
    useEffect(() => {
        if (minorSearch === "") {
            setMajorDropdown([]);
            return
        }
        if (selectedMinor === "") {
            let matchedMinors = [];
            for (let i = 0; i < allMinors.length; i++) {
                if (allMinors[i].toLocaleLowerCase().includes(minorSearch.toLocaleLowerCase())) {
                    matchedMinors.push(allMinors[i]);
                }
            }
            setMinorDropdown(matchedMinors);
        } else {
            setMinorDropdown([]);
        }
    }, [minorSearch])

    // Resize, preview profile picture
    const onProfilePicChange = async(e) => {
        const options = {
            maxSizeMB: 0.1,
            maxWidthOrHeight: 700,
            useWebWorker: true
        }
        try {
            const compressedFile = await imageCompression(e.target.files[0], options);
            setImg(compressedFile);
            console.log(img);
        } catch (error) {
            console.log(error);
        }
    }

    // Major search bar type event
    const onMajorSearchChange = e => {
        setMajorSearch(e.target.value);
        setSelectedMajor("");
    }

    // Select a major
    const selectMajor = major => {
        setSelectedMajor(major);
        setMajorSearch(major);
        setMajorDropdown([]);
    }

    // Major search bar type event
    const onMinorSearchChange = e => {
        setMinorSearch(e.target.value);
        setSelectedMinor("");
    }

    // Select a major
    const selectMinor = minor => {
        setSelectedMinor(minor);
        setMinorSearch(minor);
        setMinorDropdown([]);
    }

    // Type course name
    const onCourseChange = e => {
        setCourse(e.target.value.toUpperCase());
    }

    // Add course to course list
    const addCourseToList = () => {
        if (!courseList.includes(course)) {
            setCourseList([...courseList, course]);
        } 
        setCourse("");
    }

    // Remove a course from course list
    const removeCourseFromList = c => {
        let newCourseList = [];
        for (let i = 0; i < courseList.length; i++) {
            if (courseList[i] !== c) {
                newCourseList.push(c);
            }
        }
        setCourseList(newCourseList);
    }
    
    if (signedIn) {
    return (
        <div className="w-full min-h-screen bg-slate-200 pb-20">
            <NavBar/>
            <div className="w-11/12 lg:w-10/12 mx-auto pt-20">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">Tell others about yourself</h1>
                <form className="w-full mt-8 text-lg lg:text-2xl">
                    <div className="flex flex-col">
                        {imgPreview ? (<img className="w-72 h-60" src={imgPreview} alt="Profile img"></img>) : (<img className="w-72 h-60" src="img/bg-default-resized.png" alt="Profile img"></img>)}
                        <div className="flex flex-row mt-4">
                            <label className='font-semibold mr-2'>Profile picture:</label>
                            <input accept='.jpg, .png' type="file" onChange={onProfilePicChange}></input>
                        </div>
                        <div className="flex flex-col mt-4">
                            <label className='font-semibold mr-2'>Name:</label>
                            <input className="text-xl border border-slate-500 rounded-md py-2 px-4 w-72 h-fit mt-2 shadow-md shadow-slate-300" type="text" placeholder='Type your name here'></input>
                        </div>
                        <div className="flex flex-col mt-4">
                            <label className='font-semibold mr-2'>Major:</label>
                            <div className="flex flex-col w-72">
                                <input className="text-xl border border-slate-500 rounded-md py-2 px-4 w-full h-fit mt-2 shadow-md shadow-slate-300" value={majorSearch} type="text" placeholder='Select your major' onChange={onMajorSearchChange}></input>
                                <div className="flex flex-col min-h-0 max-h-40 overflow-y-scroll">
                                    {majorDropdown.map(major => 
                                        (
                                            <div key={major} className="py-2 px-3 bg-white border border-slate-300 text-md lg:text-xl cursor-default hover:bg-blue-500" onClick={() => {selectMajor(major)}}>
                                                <p>{major}</p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col mt-4">
                            <label className='font-semibold mr-2'>Minor (Select "None" if don't apply):</label>
                            <div className="flex flex-col w-72">
                                <input className="text-xl border border-slate-500 rounded-md py-2 px-4 w-full h-fit mt-2 shadow-md shadow-slate-300" value={minorSearch} type="text" placeholder='Select your minor' onChange={onMinorSearchChange}></input>
                                <div className="flex flex-col min-h-0 max-h-40 overflow-y-scroll">
                                    {minorDropdown.map(minor => 
                                        (
                                            <div key={minor} className="py-2 px-3 bg-white border border-slate-300 text-md lg:text-xl cursor-default hover:bg-blue-500" onClick={() => {selectMinor(minor)}}>
                                                <p>{minor}</p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col mt-4">
                            <label className='font-semibold mr-2'>Courses taking this semester:</label>
                            <div className="flex flex-col">
                                <div className="flex flex-row">
                                    <input className="text-xl border border-slate-500 rounded-sm py-2 px-4 w-72 h-fit mt-2 shadow-md shadow-slate-300" value={course} type="text" placeholder='Course code (e.g. CSC320)' onChange={onCourseChange}></input>
                                    <div className="text-white text-xl font-semibold px-4 py-2 h-fit mt-2 w-fit rounded-sm text-center flex flex-col justify-center bg-red-500 hover:bg-red-700 duration-200 cursor-default" onClick={addCourseToList}>
                                        Add
                                    </div>
                                </div>
                                <div className="w-96 flex flex-row flex-wrap mt-2">
                                    {courseList.map((c, index) => (
                                        <div key={index} className="py-2 px-3 text-lg lg:text-xl rounded-sm bg-white text-black shadow-md shadow-slate-500 text-center flex flex-row mr-2 mt-2">
                                            {c} <span className='ml-2 text-slate-300 hover:text-slate-500 duration-200 cursor-default' onClick={() => {removeCourseFromList(c)}}>X</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col mt-4">
                            <label className='font-semibold mr-2'>Description of your studying style and needs:</label>
                            <textarea className='h-40 w-full md:w-1/2 px-4 py-2 text-lg mt-4 rounded-md border border-slate-300 shadow-md shadow-slate-300' maxLength={300} placeholder="Enter description here. Don't go over 300 characters."></textarea>
                        </div>

                        <input type="submit" className="rounded-sm bg-red-500 hover:bg-red-700 duration-200 px-4 py-2 text-xl lg:text-2xl text-white font-semibold mt-8 w-fit" value="Submit"></input>
                    
                    </div>
                </form>
            </div>
        </div>
    )
    }
}

export default UserProfileBuilder