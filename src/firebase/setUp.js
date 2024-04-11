// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-erfDdQmW8-hV_3VtJAPV3hhzfkYtwWU",
  authDomain: "savings-react-app.firebaseapp.com",
  projectId: "savings-react-app",
  storageBucket: "savings-react-app.appspot.com",
  messagingSenderId: "937756652609",
  appId: "1:937756652609:web:9c3f9f68cd506d857182c0",
  measurementId: "G-GY4QG2XZBT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authenticate = getAuth(app);
export const db = getFirestore(app)