import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA-_k19oZbI0z_nHhOwx6gImIJ86ef9sIQ",
    authDomain: "fir-cc4bc.firebaseapp.com",
    projectId: "fir-cc4bc",
    storageBucket: "fir-cc4bc.appspot.com",
    messagingSenderId: "157715496740",
    appId: "1:157715496740:web:9be5b25b98b8a90e923db1"
  };

  const app = initializeApp(firebaseConfig);

  export const storage = getStorage(app);
  export const db = getFirestore(app);