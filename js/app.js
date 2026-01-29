// js/app.js
import { auth } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { initMap } from './map.js';
import { listenForTasks } from './tasks.js';

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const authPage = document.getElementById('auth-page');
const appPage = document.getElementById('app-page-map');
const logoutBtn = document.getElementById('logout-btn');

// Initialize App
function init() {
    console.log("Initializing TaskPop...");

    // Auth Listener
    onAuthStateChanged(auth, (user) => {
        // Fake a little delay for the splash screen effect
        setTimeout(() => {
            loadingScreen.classList.add('opacity-0');
            setTimeout(() => loadingScreen.classList.add('hidden'), 500);

            if (user) {
                // User is signed in
                console.log("User logged in:", user.uid);
                showApp(user);
            } else {
                // User is signed out
                console.log("User logged out");
                showAuth();
            }
        }, 800);
    });

    // Logout Handler
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            import('./auth.js').then(module => module.logout());
        });
    }
}

function showAuth() {
    authPage.classList.remove('hidden');
    appPage.classList.add('hidden');
}

function showApp(user) {
    authPage.classList.add('hidden');
    appPage.classList.remove('hidden');

    // Update Avatar (simple)
    const avatar = document.getElementById('user-avatar');
    if (avatar && user.email) {
        avatar.textContent = user.email[0].toUpperCase();
    }

    // Initialize Map if not already done
    // We check if map container is empty or rely on map.js idempotency
    // ideally map.js exports an init function that handles single instantiation
    initMap(user);
    listenForTasks(); // Start real-time listener
}

// Start
init();
