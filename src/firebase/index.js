// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getFunctions } from "@firebase/functions"
import { getAuth, GoogleAuthProvider } from "@firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBFQJVxg_NWJQIZueJWzi9M0r1GTqTk0vw",
  authDomain: "nursespass.firebaseapp.com",
  projectId: "nursespass",
  storageBucket: "nursespass.appspot.com",
  messagingSenderId: "61597466365",
  appId: "1:61597466365:web:d23e8e4336410bed848894",
  measurementId: "G-ZL544PZFHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)
export const functions = getFunctions(app)

export const provider = new GoogleAuthProvider()