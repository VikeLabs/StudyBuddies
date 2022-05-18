// Imports for application
const path = require('path');
const express = require("express");
var cors = require("cors");
require('dotenv').config()

// Imports for Firebase
const {initializeApp} = require("firebase/app");
const {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} = require("firebase/auth");
const {getFirestore, doc, setDoc, getDoc, getDocs, collection} = require("firebase/firestore");

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "vikes-study-buddy.firebaseapp.com",
    projectId: "vikes-study-buddy",
    storageBucket: "vikes-study-buddy.appspot.com",
    messagingSenderId: "145376806279",
    appId: "1:145376806279:web:44700f21aeff623358ff22"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

let userId = "";

const PORT = process.env.PORT || 3001;

const app = express();
// Allow CORS
app.use(cors({
    origin: '*'
  }));
app.use(express.json());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

/*** USER AUTHENTICATION ***/
// Signup
app.post("/api/signup", (req, res) => {
    createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then(userCredential => {
        // Signed in
        const user = userCredential;
        userId = user.uid;
        res.status(200).send({signedIn: true});
    })
    .catch(error => {
        res.status(200).send({signedIn: false, error: "Failed to Signup"})
    })
})

// Signin
app.post("/api/signin", (req, res) => {
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then(userCredential => {
        const user = userCredential.user;
        userId = user.uid;
        res.status(200).send({signedIn: true});
    })
    .catch(error => {
        res.status(200).send({signedIn: false})
    })
})

// Signout
app.get("/api/signout", (req, res) => {
    signOut(auth).then(() => {
        res.status(200).send({msg: "Signed out successfully"})
      }).catch((error) => {
        res.status(400).send({msg: "Failed to sign out"})
      });
})

// Check if user is signed in
app.get("/api/user", (req, res) => {
    const user = auth.currentUser;
    if (user) {
        res.status(200).send({user: true})
    } else {
        res.status(200).send({user:false});
    }
})

// Upload user profile to firebase database
app.post("/api/user-profile", async (req, res) => {
    console.log("userId for user profile: ", userId);
    const newUserProfile = {
        id: userId,
        name: req.body.name,
        profileImg: req.body.profileImg,
        major: req.body.major,
        minor: req.body.minor,
        courses: req.body.courses,
        description: req.body.description
    }
    const docRef = doc(db, "user-profile", userId);
    try {
        await setDoc(docRef, newUserProfile);
        res.status(200).send({success: true});
    } catch (e) {
        console.log(e);
        res.status(200).send({success: false});
    }
    
})

// Read main user's profile
app.get("/api/user-profile", async(req, res) => {
    const owner = req.query.owner;
    if (owner) {
        const profileRef = doc(db, "user-profile", userId);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
            res.status(200).send({profile: profileSnap.data()});
        } else {
            res.status(200).send({profile: null});
        }
    } else {
        console.log("Retrieving other user profile");
    }
})

// Read an other user's profile
app.get("/api/user-profile/:id", async(req, res) => {
    const id = req.params.id;
    const userProfileRef = doc(db, "user-profile", id);
    const userProfileSnap = await getDoc(userProfileRef);
    if (userProfileSnap.exists()) {
        res.status(200).send({profile:userProfileSnap.data()})
    } else {
        res.status(200).send({msg: "User not found"})
    }
})

// Allow users to add posts
app.post("/api/add-post", async(req, res) => {
    const newPost = {
        user: userId,
        need: req.body.need,
        deadline: req.body.deadline,
        description: req.body.description
    }
    const allPostsRef = doc(db, "post", "allPosts");
    const allPostsSnap = await getDoc(allPostsRef);
    let allPostsList = [];
    if (allPostsSnap.exists()) {
        allPostsList = allPostsSnap.data().posts;
    }
    allPostsList.push(newPost);
    try {
        await setDoc(allPostsRef, {posts: allPostsList});
        res.status(200).send({success:true});
    } catch (error) {
        res.status(200).send({success: false});
    }
    
})

// Get all other users information
app.get("/api/other-users", async(req, res) => {
    const usersSnapshot = await getDocs(collection(db, "user-profile"));
    const users = [];
    usersSnapshot.forEach(user => {
        // console.log(user.id);
        if (user.id != userId) {
            users.push(user.data());
        }
    })
    // console.log(users);
    res.status(200).send({users: users});
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
});

// Application listens on the set port
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});