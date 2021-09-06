// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9f_JGxtt5SN5WQ5DJywonWIR54Q41axI",
  authDomain: "photogallery-reactjs.firebaseapp.com",
  projectId: "photogallery-reactjs",
  storageBucket: "photogallery-reactjs.appspot.com",
  messagingSenderId: "510140850954",
  appId: "1:510140850954:web:ef0ae261bf55ec7fb910f3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
  const appStorage = getStorage(firebaseApp);
  const appFirestore = getFirestore(firebaseApp);

export { appStorage, appFirestore };