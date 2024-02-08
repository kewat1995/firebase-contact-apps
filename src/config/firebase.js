// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcwccFxLdc054Oas225fR6c8OU5pC_bj4",
  authDomain: "contact-firebase-40bfb.firebaseapp.com",
  projectId: "contact-firebase-40bfb",
  storageBucket: "contact-firebase-40bfb.appspot.com",
  messagingSenderId: "959512338661",
  appId: "1:959512338661:web:fed3fdd115214149baf40c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
