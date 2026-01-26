import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

export function signinUser(db, req, res) {
  const {email, password} = req.body;
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
  .then((Credential) => Credential.user.uid)
  .then((uId) => {
    res.status(200).json('user logged in successfully')
  })
  .catch(error => res.status(400).json('Unable to log in'))
  
}
