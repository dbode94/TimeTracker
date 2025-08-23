import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const express = require('express');
const path = require('path');

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


// Not needed just now
//const analytics = getAnalytics(app);

const firebase = initializeApp(firebaseConfig);
const app = express();

app.get('/', (req,res) => {
    res.send(path.join(__dirname, 'public', 'index.html'));
})

app.listen(3000, () =>{
    console.log('app listening')
})



