import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCdJZItUz2_wPemqoURvHKqARsFC8kWUo0",
  authDomain: "pic-fetch-a3d19.firebaseapp.com",
  projectId: "pic-fetch-a3d19",
  storageBucket: "pic-fetch-a3d19.appspot.com",
  messagingSenderId: "291007434607",
  appId: "1:291007434607:web:74630449b39de15a41629a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imgDB = getStorage(app);

export { imgDB };
export const db = getFirestore(app);
export const auth = getAuth(app);
