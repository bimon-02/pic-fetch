// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";




// const firebaseConfig = {
//   apiKey: "AIzaSyBvpslLMNzw77u9RPlu7OpbTlB7QSM5mfk",
//   authDomain: "pic-fetch-886da.firebaseapp.com",
//   projectId: "pic-fetch-886da",
//   storageBucket: "pic-fetch-886da.appspot.com",
//   messagingSenderId: "772171486701",
//   appId: "1:772171486701:web:d91fc79cfe18d77d8e83e4",
//   measurementId: "G-KVPJCM0QN2",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// export { db };

// Import the functions you need from the SDKs you need
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