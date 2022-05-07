// Imports for application
const path = require('path');
const express = require("express");
var cors = require("cors");
require('dotenv').config()

// Imports for Firebase
const {initializeApp} = require("firebase/app");
const {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} = require("firebase/auth");

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

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
});

/*** USER AUTHENTICATION ***/
// Signup
app.post("/signup", (req, res) => {
    createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then(userCredential => {
        // Signed in
        const user = userCredential;
        const userId = user.uid;
        res.status(200).send({signedIn: true});
    })
    .catch(error => {
        res.status(200).send({signedIn: false, error: "Failed to Signup"})
    })
})

// Signin
app.post("/signin", (req, res) => {
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

// Check if user is signed in
app.get("/user", (req, res) => {
    const user = auth.currentUser;
    if (user) {
        res.status(200).send({user: true})
    } else {
        res.status(200).send({user:false});
    }
})

// Application listens on the set port
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});