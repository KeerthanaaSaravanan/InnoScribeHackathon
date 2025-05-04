import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDyk88aL8av7EpQePfkXf1ciCv2T8Ei1Js",
  authDomain: "innoscribe-2802a.firebaseapp.com",
  projectId: "innoscribe-2802a",
  storageBucket: "innoscribe-2802a.firebasestorage.app",
  messagingSenderId: "83352898548",
  appId: "1:83352898548:web:30816c63678c0503cf87a1",
  measurementId: "G-DFDVF87C5T"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

export {
  auth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};