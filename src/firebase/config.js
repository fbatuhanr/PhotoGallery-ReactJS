import * as firebase from "firebase/app";
import 'firebase/storage';
import 'firebase/firestore';

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
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.fireStore();

export {projectStorage, projectFirestore};