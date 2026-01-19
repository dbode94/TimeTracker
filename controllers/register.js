import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import bodyParser from "body-parser";

const json = bodyParser.json();

export function registerUser(db,req,res) {
  const {firstName, lastName, email, password} = req.body
  const auth = getAuth();
  
  const document = {
    firstName: firstName,
    lastName: lastName,
    email: email
  }

  //Create the user account
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredentials) => userCredentials.user.uid)
  .then(async (uid) => {
    try{
      //Due to db rules I need to sign in the new user before it can make any changes
      await signInWithEmailAndPassword(auth, email, password);
      //Create the user document
      const setDocResponse = await setDoc(doc(db,"users", uid), document);
      
      res.status(200).json('Registration complete');
      
    } catch(error){
      console.error('ERROR:', error.message);
    }    
  })
  .catch((error) => res.status(400).json('Unable to register'));

}
