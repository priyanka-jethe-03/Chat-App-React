import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC3dDnUfzu6ZaV8-r5iMGM924UEfomNEAk",
  authDomain: "chat-app-react-672b3.firebaseapp.com",
  projectId: "chat-app-react-672b3",
  storageBucket: "chat-app-react-672b3.appspot.com",
  messagingSenderId: "892051600187",
  appId: "1:892051600187:web:f9db4d7d5b8c5a23913d1e"
};


const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const provider = new GoogleAuthProvider();
export const database= getFirestore(app);