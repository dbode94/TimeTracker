import {collection, getDocs} from 'firebase/firestore'

export function getAllTimers (db, req, res) {
    if(!!req.session?.userId) {

        console.log(req.session.userId)
        
        const userId = req.session.userId
        const collectionRef = collection(db, 'users', userId, 'timers');
        getDocs(collectionRef)
        .then((docs) => docs.forEach(doc => console.log(doc.data)))
        .catch((error) => console.error('ERROR Fetcing:', error))
    }
}