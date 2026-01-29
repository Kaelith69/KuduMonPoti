// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// TODO: Replace with your actual Firebase project config
const firebaseConfig = {
    apiKey: "AIzaSyCygbgxKt5n_65fy9dk_747wYTY4vCPxYg",
    authDomain: "ducktie-4dc29.firebaseapp.com",
    projectId: "ducktie-4dc29",
    storageBucket: "ducktie-4dc29.firebasestorage.app",
    messagingSenderId: "951901968522",
    appId: "1:951901968522:web:c6a00e61901da20983b573"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
