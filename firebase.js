// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyD6PI92LQ5IlL4ajpERKzdQNOPGBjTBPTM",
  authDomain: "helia-6221.firebaseapp.com",
  projectId: "helia-6221",
  storageBucket: "helia-6221.appspot.com",
  messagingSenderId: "402498896972",
  appId: "1:402498896972:web:574e043c7745a32334a0e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { app, auth, db }