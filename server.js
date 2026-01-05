import { initializeApp } from "firebase/app";
import express from "express";
import "dotenv/config"
import session from "express-session";
import path from "path";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEk4PmYUUz7R5HSkgF1a0LFamOaoRyxAA",
  authDomain: "timetracker-d13fe.firebaseapp.com",
  projectId: "timetracker-d13fe",
  storageBucket: "timetracker-d13fe.firebasestorage.app",
  messagingSenderId: "491189617234",
  appId: "1:491189617234:web:09ee702fda9e8093cd558b",
  measurementId: "G-V5BL7W38TC"
};


const firebase = initializeApp(firebaseConfig);
const app = express();

app.use( session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

//Serves static files from the public folder
app.use('/login', express.static('public//login'));
app.use('/app', express.static('public//app'));


//Auth Check
function isLoggedIn(req){
  return !!req.session?.user;
}

//Redirecting depending on Auth
// app.get('/', (req,res) => {
//   return isLoggedIn(req)? res.redirect('/app') : res.redirect('login');
// })

app.listen(3000, () =>{
    console.log('listening to port 3000');
})



