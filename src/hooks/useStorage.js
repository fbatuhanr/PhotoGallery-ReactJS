import { useState, useEffect } from "react";

import { appStorage, appFirestore } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const useStorage = (file) => {

    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
                
        const storageRef = ref(appStorage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, file.type);

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
                .then((downloadURL) => {
                    setUrl(downloadURL);
                });
            }
        );

    }, [file]);

    return { progress, url, error };
}

export default useStorage;