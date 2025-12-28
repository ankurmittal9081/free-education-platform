import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhz0Jvy2oHPaSHLoovwBgKeQGwiDtPurc",
  authDomain: "micro-harbor-455116-v2.firebaseapp.com",
  projectId: "micro-harbor-455116-v2",
  storageBucket: "micro-harbor-455116-v2.firebasestorage.app",
  messagingSenderId: "596871723352",
  appId: "1:596871723352:web:fa3317c9474dc244004d2d",
  measurementId: "G-1NDECLESDR"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);