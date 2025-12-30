import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

/**
 * Firebase Configuration
 * (Env variables are SAFE – frontend exposure is normal for Firebase)
 */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// ✅ Prevent multiple Firebase initializations
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

// 🔐 Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
