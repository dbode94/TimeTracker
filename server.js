import "dotenv/config"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";

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

// TESTING CREDENTIALS:
// email: dbodesosa@gmail.com
// password: Testing@2026

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const app = express();

//============================================================================================
// Controllers
//============================================================================================
function isLoggedIn(req){
  return !!req.session?.user;
}

function registerUser(req,res) {
  const {firstName, lastName, email, password} = req.body
  const auth = getAuth();
  
  const document = {
    timers: {},
    firstName: firstName,
    lastName: lastName,
    email: email
  }

  //Try to create the user authentication
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredentials) => userCredentials.user.uid)
  .then(async (uid) => {
    try{
      //Due to db rules I need to sign in the new user before it can make any changes
      await signInWithEmailAndPassword(auth, email, password)
      //Create the user document
      const setDocResponse = await setDoc(doc(db,"users", uid), document);
      
    } catch(error){
      console.error('ERROR:', error.message)
    }    
  })
  .catch((error) => {console.error('ERROR:', error.message)})
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
app.post('/login/signin', (req, res) => {console.log(req.body); res.json('Done')})
app.post('/login/register', (req, res) => {registerUser(req, res)})



app.listen(3000, () =>{
    console.log('listening to port 3000');
})



