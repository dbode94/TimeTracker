import {collection, getDocs, Timestamp} from 'firebase/firestore'

export function getAllTimers (db, req, res) {
    if(!!req.session?.userId) {
        const userId = req.session.userId
        const collectionRef = collection(db, 'users', userId, 'timers');
        getDocs(collectionRef)
        .then((docs) => {
            const timers = [];
            docs.forEach(doc => {
                const lastModified = new Timestamp(doc.data().lastModified.seconds, doc.data().lastModified.nanoseconds);
                const lastModifiedDate = lastModified.toDate();
                timers.push({...doc.data(),lastModified: lastModifiedDate, id: doc.id})
            })                    
            
            res.status(200).json(timers)
        })
        .catch((error) => res.status(400).json('Unable to fetch timers'))
    }
}