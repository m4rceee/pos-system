import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
//import { getFirebase, getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA1AtNavxsHlIaIuFLqvlvIfP49aQe98gQ",
  authDomain: "melyson-pos-system.firebaseapp.com",
  projectId: "melyson-pos-system",
  storageBucket: "melyson-pos-system.appspot.com",
  messagingSenderId: "594160639343",
  appId: "1:594160639343:web:aaeefb51016062c64b1c9a",
  measurementId: "G-L0CDJ7QPC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getAuth(app);
//export const firestore = getFirestore(app);