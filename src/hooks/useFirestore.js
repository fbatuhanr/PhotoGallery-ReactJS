import { useState, useEffect } from "react";
import { appFirestore } from "../firebase/config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const useFirestore = (collectionName) => {
    
    const [docs, setDocs] = useState([]);

    useEffect(() => {

        const collectionRef = collection(appFirestore, collectionName);
        const collectionQuery = query(collectionRef, orderBy("createdAt", "desc"));
        const collectionSnap = onSnapshot(collectionQuery, (snap) => {
            let documents = [];
            snap.forEach((doc) => {
                documents.push({...doc.data(), id: doc.id})
            });
            setDocs(documents);
          });
        return () => collectionSnap();

    }, [collectionName]);

    return { docs };
}

export default useFirestore;