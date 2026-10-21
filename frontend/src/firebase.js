import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEWlNLv-WOIcfbUquDkhNg1yAk19FQXm0",
  authDomain: "cloude-skillgap-ai.firebaseapp.com",
  projectId: "cloude-skillgap-ai",
  storageBucket: "cloude-skillgap-ai.firebasestorage.app",
  messagingSenderId: "940264370798",
  appId: "1:940264370798:web:68447bcecc3695d6e8ec7f",
  measurementId: "G-E9V0E4FD6T"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);