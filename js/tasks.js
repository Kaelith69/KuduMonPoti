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

// Elements for My Tasks View
const myTasksPage = document.getElementById('my-tasks-page');
const appPageMap = document.getElementById('app-page-map');
const navExplore = document.getElementById('nav-explore');
const navMyTasks = document.getElementById('nav-mytasks');
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
if (navExplore && navMyTasks) {
    navExplore.addEventListener('click', () => {
        switchView('explore');
    });
    navMyTasks.addEventListener('click', () => {
        switchView('mytasks');
    });
}

function switchView(view) {
    if (view === 'explore') {
        appPageMap.classList.remove('hidden');
        myTasksPage.classList.add('hidden');

        navExplore.classList.add('active', 'text-primary');
        navExplore.classList.remove('text-gray-400');
        navMyTasks.classList.remove('active', 'text-primary');
        navMyTasks.classList.add('text-gray-400');
    } else {
        appPageMap.classList.add('hidden');
        myTasksPage.classList.remove('hidden');

        navMyTasks.classList.add('active', 'text-primary');
        navMyTasks.classList.remove('text-gray-400');
        navExplore.classList.remove('active', 'text-primary');
        navExplore.classList.add('text-gray-400');

        renderMyTasks();
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
            allTasks.push(task);
        });

        updateMarkers();
        if (!myTasksPage.classList.contains('hidden')) {
            renderMyTasks();
        }

        // Also update profile rating display if needed
        const user = auth.currentUser;
        if (user) updateUserProfileRating(user);

    }, (error) => {
        console.error("Firestore Error:", error);
    });
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
            return task.assignee && task.assignee.id === user.uid; // Claimed by me
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
    claimBtn.onclick = null; // Clear old listeners
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

        // If pending confirmation, show Confirm button instead of delete (or alongside)
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
                // Hide detail modal to focus on rating
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
            // I am the assignee
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

// Helper to calc avg rating
async function updateUserProfileRating(user) {
    const q = query(
        collection(db, "tasks"),
        where("assignee.id", "==", user.uid),
        where("status", "==", "completed")
    );
    // Note: This requires index on assignee.id + status. Simple query should work.

    // We can't actually update the profile directly in Firebase Auth easily (custom claims).
    // We will just calc locally for display in the avatar or header.
    // For now, let's just log it or update the UI element if we had one.
    // Requirement: "result should be showed on the i profi;e"

    // Let's hijack the avatar text for now to show "4.5★"
    try {
        const snapshot = await getDocs(q);
        let total = 0;
        let count = 0;
        snapshot.forEach(d => {
            const data = d.data();
            if (data.rating) {
                total += data.rating;
                count++;
            }
        });

        if (count > 0) {
            const avg = (total / count).toFixed(1);
            const avatar = document.getElementById('user-avatar');
            if (avatar) {
                // Creating a small floating badge
                // Check if badge exists
                let badge = document.getElementById('rating-badge');
                if (!badge) {
                    badge = document.createElement('div');
                    badge.id = 'rating-badge';
                    badge.className = 'absolute -bottom-1 -right-1 bg-yellow-400 text-white text-[10px] px-1 rounded-full font-bold shadow-sm';
                    avatar.parentElement.style.position = 'relative'; // ensure parent is relative
                    avatar.parentElement.appendChild(badge);
                }
                badge.textContent = `${avg}★`;
            }
        }
    } catch (e) {
        console.log("Rating calc error (likely index missing):", e);
    }
}
