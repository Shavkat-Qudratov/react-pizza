import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAInjCKg05Zyhs23v8ZNArsM6-BEYFKSz8",
  authDomain: "pizza-6d86e.firebaseapp.com",
  projectId: "pizza-6d86e",
  storageBucket: "pizza-6d86e.appspot.com",
  messagingSenderId: "745688762235",
  appId: "1:745688762235:web:a48c0bd8b04b943c97dfde"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
