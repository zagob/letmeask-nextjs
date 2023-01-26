import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child, onValue, off } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6F4NkdQM2_LzOtUo0WrdwFwNNDeBqq3M",
  authDomain: "letmeask-nextjs-69d19.firebaseapp.com",
  projectId: "letmeask-nextjs-69d19",
  storageBucket: "letmeask-nextjs-69d19.appspot.com",
  messagingSenderId: "968177540196",
  appId: "1:968177540196:web:ee6036b8f388b7f08fd371",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export {
  app,
  db,
  ref,
  get,
  child,
  onValue,
  off,
  auth,
  GoogleAuthProvider,
  signInWithPopup,
};
