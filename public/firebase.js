// lib/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDrPwNcxjwRgFFO7hSiWtNrdjvUQnJVLkg",
    authDomain: "ofs-project160.firebaseapp.com",
    projectId: "ofs-project160",
    storageBucket: "ofs-project160.appspot.com",
    messagingSenderId: "801653671708",
    appId: "1:801653671708:web:b98f4aac2e5ff7b0b61cd9",
    measurementId: "G-39V3J74X55"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
