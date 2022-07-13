import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCg8N1YbxbEI4RHnWzegGKbdUHfhroTbos",
  authDomain: "cellular-dream-314119.firebaseapp.com",
  projectId: "cellular-dream-314119",
  storageBucket: "cellular-dream-314119.appspot.com",
  messagingSenderId: "450676346720",
  appId: "1:450676346720:web:6ba3e768d7233a7cd05805",
  measurementId: "G-9GH42M32V5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);