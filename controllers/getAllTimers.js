import {collection, getDocs} from 'firebase/firestore'

export function getAllTimers (db, req, res) {
    if(!!req.session?.userId) {
        const userId = req.session.userId
        const collectionRef = collection(db, 'users', userId, 'timers');
        getDocs(collectionRef)
        .then((docs) => {
            const timers = [];
            docs.forEach(doc => timers.push({...doc.data(), id: doc.id}))                    
            res.status(200).json(timers)
        })
        .catch((error) => res.status(400).json('Unable to fetch timers'))
    }
}