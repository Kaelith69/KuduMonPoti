// js/auth.js
import { auth } from './firebase-config.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from './firebase-config.js';

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const toggleAuthBtn = document.getElementById('toggle-auth');
const authError = document.getElementById('auth-error');

let isLoginMode = true;

// Toggle Login/Signup
if (toggleAuthBtn) {
    toggleAuthBtn.addEventListener('click', () => {
        isLoginMode = !isLoginMode;
        if (isLoginMode) {
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
            toggleAuthBtn.textContent = 'New to SideQuest? Sign Up';
        } else {
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
            toggleAuthBtn.textContent = 'Already have an account? Sign In';
        }
        authError.classList.add('hidden');
    });
}

// Handle Login
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Auth listener in app.js will handle redirect
        } catch (error) {
            showError(error.message);
        }
    });
}

// Handle Signup
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update Auth Profile
            await updateProfile(user, {
                displayName: name
            });

            // specific: Create User Doc with Wallet Balance (Demo Money)
            await setDoc(doc(db, "users", user.uid), {
                email: email,
                name: name,
                balance: 500, // Initial demo balance
                createdAt: new Date()
            });

            // Auth listener in app.js will handle redirect
        } catch (error) {
            showError(error.message);
        }
    });
}

// Logout
export async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Logout failed", error);
    }
}

function showError(msg) {
    authError.textContent = msg.replace('Firebase:', '').trim();
    authError.classList.remove('hidden');
}
