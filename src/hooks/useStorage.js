import { useState, useEffect } from "react";

import { appStorage, appFirestore } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const useStorage = (file) => {

    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
 
        // Firebase Storage
        const storageRef = ref(appStorage, "images/"+file.name);
            const uploadTask = uploadBytesResumable(storageRef, file, file.type);
        // Firebase Firestore
        const collectionRef = collection(appFirestore, "images");

        uploadTask.on('state_changed', (snapshot) => { 
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
                // console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                    console.log('Upload is paused');
                    break;
                    case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, (err) => { 
                // A full list of error codes is available at https://firebase.google.com/docs/storage/web/handle-errors
                switch (err.code) {
                    case 'storage/unauthorized': setError("You don't have permission to upload!"); break;
                    case 'storage/canceled': setError("Upload cancelled!"); break;
                    case 'storage/unknown': setError("An unknown error occurred!"); break;
                    default: setError(err); break;
                }
            }, () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref)
                .then(async (downloadURL) => {
                    try {
                        const docRef = await addDoc(collectionRef, {
                          url: downloadURL,
                          createdAt: serverTimestamp()
                        });
                        console.log("Document written with ID: ", docRef.id);
                        setUrl(downloadURL);
                      } catch (e) {
                        console.error("Error adding document: ", e);
                      }                      
                });
            }
        );

    }, [file]);

    return { progress, url, error };
}

export default useStorage;