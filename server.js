import "dotenv/config"
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore"
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";

//Importing Controllers
import {registerUser} from "./controllers/register.js";
import {signinUser} from "./controllers/signin.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMNET_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const app = express();

//============================================================================================
// Controllers
//============================================================================================
function isLoggedIn(req) {
  return !!req.session?.user;
}



//============================================================================================
// Middlewares
//============================================================================================
app.use( session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.json());


//============================================================================================
// Routing
//============================================================================================
app.use('/login', express.static('public//login'));
app.use('/app', express.static('public//app'));

// Redirecting depending on Auth
app.get('/', (req,res) => {
  return isLoggedIn(req)? res.redirect('app') : res.redirect('login');
})


//============================================================================================
// Endpoints
//============================================================================================
app.post('/login/signin', (req, res) => {signinUser(db, req, res)})
app.post('/login/register', (req, res) => {registerUser(db, req, res)})



app.listen(3000, () =>{
    console.log('listening to port 3000');
})



