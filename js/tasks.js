// js/tasks.js
import { db, auth } from './firebase-config.js';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { addMarker, getMapCenter, calculateDistance, clearMarkers, onUserLocationUpdate } from './map.js';

// Modals
const createModal = document.getElementById('create-modal');
const detailModal = document.getElementById('task-detail-modal');
const ratingModal = document.getElementById('rating-modal');

// Buttons & Forms
const fab = document.getElementById('fab-add-task');
const closeModalBtns = document.querySelectorAll('#create-modal-backdrop, #detail-modal-backdrop, #rating-modal-backdrop, #cancel-create, #cancel-rating-btn');
const createTaskForm = document.getElementById('create-task-form');
const submitRatingBtn = document.getElementById('submit-rating-btn');

// Elements for Filters & Search
const filterContainer = document.getElementById('filter-container');
const searchInput = document.getElementById('search-input');

// Elements for Views
const myTasksPage = document.getElementById('my-tasks-page');
const profilePage = document.getElementById('profile-page');
const appPageMap = document.getElementById('app-page-map');

// Navigation
const navExplore = document.getElementById('nav-explore');
const navMyTasks = document.getElementById('nav-mytasks');
const navProfile = document.getElementById('nav-profile');

const myTasksList = document.getElementById('my-tasks-list');
const tabPosted = document.getElementById('tab-posted');
const tabClaimed = document.getElementById('tab-claimed');

// State
let allTasks = [];
let currentUserLocation = null;
let currentCategoryFilter = 'all';
let currentSearchQuery = '';
let myTasksTab = 'posted';
let currentRatingTask = null; // Task being rated
let currentRatingValue = 0;

// Subscribe to location updates
onUserLocationUpdate((loc) => {
    currentUserLocation = loc;
    updateMarkers();
});

// UI Logic
if (fab) {
    fab.addEventListener('click', () => {
        createModal.classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('create-modal-backdrop').classList.remove('opacity-0');
            document.getElementById('create-modal-content').classList.remove('translate-y-full');
        }, 10);
    });
}

closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        closeModals();
    });
});

function closeModals() {
    // Create Modal
    document.getElementById('create-modal-backdrop').classList.add('opacity-0');
    document.getElementById('create-modal-content').classList.add('translate-y-full');

    // Detail Modal
    const detailBackdrop = document.getElementById('detail-modal-backdrop');
    const detailContent = document.getElementById('detail-modal-content');
    if (detailBackdrop) detailBackdrop.classList.add('opacity-0');

    // Rating Modal
    const ratingBackdrop = document.getElementById('rating-modal-backdrop');
    if (ratingBackdrop) ratingBackdrop.classList.add('opacity-0');

    setTimeout(() => {
        createModal.classList.add('hidden');
        if (detailModal) detailModal.classList.add('hidden');
        if (detailContent) detailContent.classList.add('translate-y-full');
        if (ratingModal) ratingModal.classList.add('hidden');
    }, 300);
}

// Rating Modal Logic
const starContainer = document.getElementById('star-container');
if (starContainer) {
    const stars = starContainer.querySelectorAll('.star-btn');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            currentRatingValue = parseInt(star.getAttribute('data-value'));
            updateStarsUI(currentRatingValue);
            if (submitRatingBtn) submitRatingBtn.disabled = false;
        });
    });
}

function updateStarsUI(val) {
    const stars = starContainer.querySelectorAll('.star-btn');
    stars.forEach(s => {
        const v = parseInt(s.getAttribute('data-value'));
        if (v <= val) {
            s.classList.remove('text-gray-300');
            s.classList.add('text-yellow-400');
        } else {
            s.classList.add('text-gray-300');
            s.classList.remove('text-yellow-400');
        }
    });
    // Color the submit button
    if (submitRatingBtn) {
        submitRatingBtn.classList.remove('bg-gray-200', 'text-gray-400');
        submitRatingBtn.classList.add('bg-primary', 'text-white');
    }
}

if (submitRatingBtn) {
    submitRatingBtn.addEventListener('click', async () => {
        if (!currentRatingTask || currentRatingValue === 0) return;

        submitRatingBtn.textContent = "Submitting...";
        submitRatingBtn.disabled = true;

        try {
            await updateDoc(doc(db, "tasks", currentRatingTask.id), {
                status: "completed",
                rating: currentRatingValue,
                completedAt: serverTimestamp()
            });
            alert("Thanks for rating!");
            closeModals();
        } catch (e) {
            console.error(e);
            alert("Error submitting rating");
        } finally {
            submitRatingBtn.textContent = "Confirm & Rate";
            submitRatingBtn.disabled = false;
        }
    });
}

// Filters
if (filterContainer) {
    const buttons = filterContainer.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => {
                b.classList.remove('active', 'bg-primary', 'text-white');
                b.classList.add('bg-white/80', 'text-gray-700');
            });
            btn.classList.add('active', 'bg-primary', 'text-white');
            btn.classList.remove('bg-white/80', 'text-gray-700');

            currentCategoryFilter = btn.getAttribute('data-filter');
            updateMarkers();
        });
    });
}

// Search
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value.toLowerCase();
        updateMarkers();
    });
}

// Navigation
if (navExplore && navMyTasks && navProfile) {
    navExplore.addEventListener('click', () => {
        switchView('explore');
    });
    navMyTasks.addEventListener('click', () => {
        switchView('mytasks');
    });
    navProfile.addEventListener('click', () => {
        switchView('profile');
    });
}

function switchView(view) {
    // Reset all navs
    navExplore.classList.remove('active', 'text-primary');
    navExplore.classList.add('text-gray-400');
    navMyTasks.classList.remove('active', 'text-primary');
    navMyTasks.classList.add('text-gray-400');
    navProfile.classList.remove('active', 'text-primary');
    navProfile.classList.add('text-gray-400');

    // Hide all pages
    appPageMap.classList.add('hidden');
    myTasksPage.classList.add('hidden');
    profilePage.classList.add('hidden');

    if (view === 'explore') {
        appPageMap.classList.remove('hidden');
        navExplore.classList.add('active', 'text-primary');
        navExplore.classList.remove('text-gray-400');
    } else if (view === 'mytasks') {
        myTasksPage.classList.remove('hidden');
        navMyTasks.classList.add('active', 'text-primary');
        navMyTasks.classList.remove('text-gray-400');
        renderMyTasks();
    } else if (view === 'profile') {
        profilePage.classList.remove('hidden');
        navProfile.classList.add('active', 'text-primary');
        navProfile.classList.remove('text-gray-400');
        renderProfile();
    }
}

function renderProfile() {
    const user = auth.currentUser;
    if (!user) return;

    // Update Basic Info
    const avatarLetter = (user.email || "?")[0].toUpperCase();
    const avatarEl = document.getElementById('profile-avatar-text');
    if (avatarEl) avatarEl.textContent = avatarLetter;

    document.getElementById('profile-name').textContent = user.displayName || "User";
    document.getElementById('profile-email').textContent = user.email;

    // Calculate Stats
    let postedCount = 0;
    let completedCount = 0;
    let totalRating = 0;
    let ratingCount = 0;

    allTasks.forEach(task => {
        // Posted Count
        if (task.poster.id === user.uid) {
            postedCount++;
        }
        // Completed Count & Rating (As Assignee context usually, or general reputation?)
        // Let's count tasks I completed for others
        if (task.assignee?.id === user.uid && task.status === 'completed') {
            completedCount++;
            if (task.rating) {
                totalRating += task.rating;
                ratingCount++;
            }
        }
    });

    const avgRating = ratingCount > 0 ? (totalRating / ratingCount).toFixed(1) : "0.0";

    document.getElementById('stat-posted').textContent = postedCount;
    document.getElementById('stat-completed').textContent = completedCount;
    document.getElementById('stat-rating').textContent = avgRating;

    // Update badge on profile page
    const badge = document.getElementById('profile-rating-badge');
    if (badge) {
        if (ratingCount > 0) {
            badge.textContent = `${avgRating}★`;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }
}

// My Tasks Tabs
if (tabPosted && tabClaimed) {
    tabPosted.addEventListener('click', () => {
        myTasksTab = 'posted';
        updateMyTasksTabs();
        renderMyTasks();
    });
    tabClaimed.addEventListener('click', () => {
        myTasksTab = 'claimed';
        updateMyTasksTabs();
        renderMyTasks();
    });
}

function updateMyTasksTabs() {
    if (myTasksTab === 'posted') {
        tabPosted.classList.add('bg-white', 'text-primary', 'border-primary');
        tabPosted.classList.remove('bg-white/50', 'text-gray-500', 'border-transparent');

        tabClaimed.classList.remove('bg-white', 'text-primary', 'border-primary');
        tabClaimed.classList.add('bg-white/50', 'text-gray-500', 'border-transparent');
    } else {
        tabClaimed.classList.add('bg-white', 'text-primary', 'border-primary');
        tabClaimed.classList.remove('bg-white/50', 'text-gray-500', 'border-transparent');

        tabPosted.classList.remove('bg-white', 'text-primary', 'border-primary');
        tabPosted.classList.add('bg-white/50', 'text-gray-500', 'border-transparent');
    }
}

// Task Creation
if (createTaskForm) {
    createTaskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = createTaskForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Posting...';
        submitBtn.disabled = true;

        const title = document.getElementById('task-title').value;
        const category = document.getElementById('task-category').value;
        const reward = document.getElementById('task-reward').value;
        const desc = document.getElementById('task-desc').value;
        const center = getMapCenter();

        const user = auth.currentUser;
        if (!user) {
            alert("Must be logged in");
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }

        try {
            await addDoc(collection(db, "tasks"), {
                title,
                category,
                reward: { amount: parseFloat(reward) || 0, currency: "GBP" },
                description: desc,
                location: { lat: center.lat, lng: center.lng },
                status: "open",
                poster: {
                    id: user.uid,
                    name: user.displayName || user.email,
                    avatar: user.photoURL || ""
                },
                createdAt: serverTimestamp()
            });

            closeModals();
            createTaskForm.reset();

        } catch (error) {
            console.error("Error adding task: ", error);
            alert("Failed to post task: " + error.message);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Listen for Tasks
export function listenForTasks() {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));

    onSnapshot(q, (snapshot) => {
        allTasks = [];
        snapshot.forEach((doc) => {
            const task = doc.data();
            task.id = doc.id;

            // Auto-Cleanup: Filter out open tasks > 24 hours
            if (task.status === 'open' && isOlderThan24h(task.createdAt, doc.id)) {
                // If we are strictly following logic, we trigger delete and don't add to list
                console.log("Auto-cleaning task", task.id);
                // Return here so it doesn't show in UI
                return;
            }

            allTasks.push(task);
        });

        updateMarkers();

        const myTasksHidden = myTasksPage.classList.contains('hidden');
        const profileHidden = profilePage.classList.contains('hidden');

        if (!myTasksHidden) renderMyTasks();
        if (!profileHidden) renderProfile();

        // Also update header avatar if needed
        const user = auth.currentUser;
        // if(user) updateUserProfileRating(user); // Optimization: renderProfile handles this now when visible

    }, (error) => {
        console.error("Firestore Error:", error);
    });
}

function isOlderThan24h(timestamp, docId) {
    if (!timestamp) return false;
    const now = new Date();
    // Firestore timestamp to date
    const taskDate = timestamp.toDate();
    const diffMs = now - taskDate;
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours >= 24) {
        // Trigger Delete
        // Ensure we don't spam deletes if multiple clients watch? 
        // Firestore rules or logic usually handles this, but for this app it's fine.
        deleteDoc(doc(db, "tasks", docId)).catch(err => console.log("Cleanup error:", err));
        return true;
    }
    return false;
}

function updateMarkers() {
    clearMarkers();
    if (!currentUserLocation) return;

    allTasks.forEach(task => {
        if (task.status !== 'open') return;

        if (currentCategoryFilter !== 'all' && task.category !== currentCategoryFilter) return;

        if (currentSearchQuery) {
            const textMatch = task.title.toLowerCase().includes(currentSearchQuery) ||
                task.description.toLowerCase().includes(currentSearchQuery);
            if (!textMatch) return;
        }

        if (task.location) {
            const dist = calculateDistance(
                currentUserLocation.lat, currentUserLocation.lng,
                task.location.lat, task.location.lng
            );

            if (dist <= 0.5) {
                addMarker(task, (t) => openTaskDetail(t, dist));
            }
        }
    });
}

function renderMyTasks() {
    const user = auth.currentUser;
    if (!user) {
        myTasksList.innerHTML = '<div class="text-center text-gray-500 mt-10">Please login to view tasks.</div>';
        return;
    }

    const filtered = allTasks.filter(task => {
        if (myTasksTab === 'posted') {
            return task.poster.id === user.uid;
        } else {
            return task.assignee && task.assignee.id === user.uid;
        }
    });

    myTasksList.innerHTML = '';
    if (filtered.length === 0) {
        myTasksList.innerHTML = '<div class="text-center text-gray-400 mt-10">No tasks found.</div>';
        return;
    }

    filtered.forEach(task => {
        const div = document.createElement('div');
        div.className = 'bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4';

        let statusColor = 'text-gray-500';
        if (task.status === 'completed') statusColor = 'text-green-600 font-bold';
        if (task.status === 'pending-confirmation') statusColor = 'text-orange-500 font-bold';

        div.innerHTML = `
            <div class="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                ${getCategoryIcon(task.category)}
            </div>
            <div class="flex-1">
                <h3 class="font-bold text-gray-900">${task.title}</h3>
                <p class="text-sm ${statusColor}">${taskStatusLabel(task.status)} • £${task.reward.amount}</p>
                ${task.rating ? `<p class="text-xs text-yellow-500">★ ${task.rating}/5</p>` : ''}
            </div>
            <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">View</button>
        `;

        div.onclick = () => {
            let dist = 0;
            if (currentUserLocation && task.location) {
                dist = calculateDistance(currentUserLocation.lat, currentUserLocation.lng, task.location.lat, task.location.lng);
            }
            openTaskDetail(task, dist);
        };

        myTasksList.appendChild(div);
    });
}

function getCategoryIcon(cat) {
    if (cat === 'Delivery') return '📦';
    if (cat === 'Help') return '🤝';
    if (cat === 'Social') return '🎉';
    return '📌';
}

function taskStatusLabel(status) {
    if (status === 'open') return 'Open';
    if (status === 'in-progress') return 'In Progress';
    if (status === 'pending-confirmation') return 'Pending Conf.';
    if (status === 'completed') return 'Completed';
    return status;
}

function openTaskDetail(task, dist) {
    if (!detailModal) return;

    document.getElementById('detail-title').textContent = task.title;
    document.getElementById('detail-desc').textContent = task.description;

    const timeString = timeAgo(task.createdAt);
    document.getElementById('detail-time-dist').textContent = `${timeString} • ${dist.toFixed(2)} km away`;

    document.getElementById('detail-poster-name').textContent = task.poster.name;
    document.getElementById('detail-price').textContent = `£${task.reward.amount}`;

    const claimBtn = document.getElementById('claim-btn');
    const deleteBtn = document.getElementById('delete-btn');
    const user = auth.currentUser;

    // Reset Buttons
    claimBtn.classList.add('hidden');
    deleteBtn.classList.add('hidden');
    claimBtn.disabled = false;
    claimBtn.textContent = "I'll do it!";
    claimBtn.onclick = null;
    deleteBtn.onclick = null;

    if (user && task.poster.id === user.uid) {
        // I am the POSTER
        deleteBtn.classList.remove('hidden');
        deleteBtn.onclick = async () => {
            if (confirm("Delete this task?")) {
                await deleteDoc(doc(db, "tasks", task.id));
                closeModals();
            }
        };

        if (task.status === 'pending-confirmation') {
            claimBtn.classList.remove('hidden');
            claimBtn.textContent = "Confirm & Rate";
            claimBtn.disabled = false;
            claimBtn.onclick = () => {
                currentRatingTask = task;
                currentRatingValue = 0;
                updateStarsUI(0);
                ratingModal.classList.remove('hidden');
                if (ratingModal.querySelector('#rating-modal-backdrop')) {
                    ratingModal.querySelector('#rating-modal-backdrop').classList.remove('opacity-0');
                }
                document.getElementById('detail-modal-content').classList.add('translate-y-full');
                setTimeout(() => detailModal.classList.add('hidden'), 300);
            };
        }

    } else {
        // I am a VIEWER / ASSIGNEE

        if (task.status === 'open') {
            claimBtn.classList.remove('hidden');
            claimBtn.textContent = "I'll do it!";

            claimBtn.onclick = async () => {
                if (!user) { alert("Please login."); return; }
                claimBtn.textContent = "Claiming...";
                claimBtn.disabled = true;
                try {
                    await updateDoc(doc(db, "tasks", task.id), {
                        status: "in-progress",
                        assignee: { id: user.uid, name: user.displayName || user.email }
                    });
                    closeModals();
                } catch (e) {
                    alert("Claim failed: " + e.message);
                    claimBtn.disabled = false;
                    claimBtn.textContent = "I'll do it!";
                }
            };

        } else if (task.status === 'in-progress' && task.assignee?.id === user?.uid) {
            claimBtn.classList.remove('hidden');
            claimBtn.textContent = "Mark as Done";

            claimBtn.onclick = async () => {
                try {
                    await updateDoc(doc(db, "tasks", task.id), { status: "pending-confirmation" });
                    alert("Marked as done! Wait for poster to confirm.");
                    closeModals();
                } catch (e) { alert("Error: " + e.message); }
            };
        } else if (task.status === 'pending-confirmation' && task.assignee?.id === user?.uid) {
            claimBtn.classList.remove('hidden');
            claimBtn.textContent = "Waiting for Confirmation...";
            claimBtn.disabled = true;
        }
    }

    detailModal.classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('detail-modal-content').classList.remove('translate-y-full');
    }, 10);
}

function timeAgo(firebaseTimestamp) {
    if (!firebaseTimestamp) return '';
    const date = firebaseTimestamp.toDate();
    const seconds = Math.floor((new Date() - date) / 1000);
    // ... simple implementation or use a library
    return Math.floor(seconds / 60) + " min ago";
}
// Removed outdated updateUserProfileRating in favor of real-time calc in renderProfile logic
