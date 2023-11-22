// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

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
const analytics = getAnalytics(app);
const storage = getStorage(app); // Initialize the storage module

export { analytics, storage }; // Export both analytics and storage for use in other files
