
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
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
export { storage };
export const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
export default auth;

