// Import the functions you need from the SDKs you need
import firebase  from "firebase/app";
import 'firebase/storage'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDkobt-TURCf0cA7KIjJaMtI7hcKePOM6g",
  authDomain: "csapp-65c10.firebaseapp.com",
  projectId: "csapp-65c10",
  storageBucket: "csapp-65c10.appspot.com",
  messagingSenderId: "769183785841",
  appId: "1:769183785841:web:72f10e8ea2f855b9e0ccd0"
};

//const firebase = require('firebase');
// Initialize Firebase
if (!firebase.apps.length) {
  try {
      firebase.initializeApp(firebaseConfig)
  } catch (err) {
      console.error('Firebase initialization error raised', err.stack)
  }
}
// Initialize Firebase
//const app = initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
