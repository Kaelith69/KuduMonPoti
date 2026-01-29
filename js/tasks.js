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
    orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { addMarker, getMapCenter, calculateDistance, clearMarkers, onUserLocationUpdate } from './map.js';

const createModal = document.getElementById('create-modal');
const detailModal = document.getElementById('task-detail-modal');
const fab = document.getElementById('fab-add-task');
const closeModalBtns = document.querySelectorAll('#create-modal-backdrop, #detail-modal-backdrop, #cancel-create');
const createTaskForm = document.getElementById('create-task-form');

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
let myTasksTab = 'posted'; // 'posted' or 'claimed'

// Subscribe to location updates from map.js
onUserLocationUpdate((loc) => {
    console.log("Location update received in tasks.js", loc);
    currentUserLocation = loc;
    updateMarkers(); // Re-filter and re-render markers when user moves
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

    setTimeout(() => {
        createModal.classList.add('hidden');
        if (detailModal) detailModal.classList.add('hidden');
        if (detailContent) detailContent.classList.add('translate-y-full');
    }, 300);
}

// Filters
if (filterContainer) {
    const buttons = filterContainer.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // UI Update
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

// Navigation (Explore vs My Tasks)
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


// Handling Task Creation
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

// Listening for Tasks
export function listenForTasks() {
    const q = query(
        collection(db, "tasks"),
        orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
        allTasks = []; // Reset local cache
        snapshot.forEach((doc) => {
            const task = doc.data();
            task.id = doc.id;
            allTasks.push(task);
        });

        updateMarkers(); // Render with new data
        if (!myTasksPage.classList.contains('hidden')) {
            renderMyTasks();
        }
    }, (error) => {
        console.error("Firestore Error:", error);
    });
}

// Filter and Render Markers
function updateMarkers() {
    // Clear existing markers
    clearMarkers();

    if (!currentUserLocation) {
        // If we don't have a location, maybe show nothing? Or all?
        // User requirement: "focus on user location... filter out every other task"
        // Implies if we don't know where user is, we shouldn't show things safely or show all fallback.
        // Let's show nothing until location is found to prevent noise.
        console.log("Waiting for user location to filter tasks...");
        return;
    }

    allTasks.forEach(task => {
        // 1. Status Check
        if (task.status !== 'open') return; // Don't show claimed/completed tasks on map (optional design choice)

        // 2. Category Filter
        if (currentCategoryFilter !== 'all' && task.category !== currentCategoryFilter) return;

        // 3. Search Filter
        if (currentSearchQuery) {
            const textMatch = task.title.toLowerCase().includes(currentSearchQuery) ||
                task.description.toLowerCase().includes(currentSearchQuery);
            if (!textMatch) return;
        }

        // 4. Distance
        if (task.location) {
            const dist = calculateDistance(
                currentUserLocation.lat, currentUserLocation.lng,
                task.location.lat, task.location.lng
            );

            // Filter condition: 0.5 km
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
            // Claimed by me
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

        div.innerHTML = `
            <div class="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                ${getCategoryIcon(task.category)}
            </div>
            <div class="flex-1">
                <h3 class="font-bold text-gray-900">${task.title}</h3>
                <p class="text-sm text-gray-500">${taskStatusLabel(task.status)} • £${task.reward.amount}</p>
            </div>
            <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">View</button>
        `;

        div.onclick = () => {
            // Calculate distance if we have location, else 0
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

    if (user && task.poster.id === user.uid) {
        deleteBtn.classList.remove('hidden');
        deleteBtn.onclick = async () => {
            if (confirm("Delete this task?")) {
                await deleteDoc(doc(db, "tasks", task.id));
                closeModals();
            }
        };
        claimBtn.classList.add('hidden');
    } else {
        deleteBtn.classList.add('hidden');
        // Only show claim if Open
        if (task.status === 'open') {
            claimBtn.classList.remove('hidden');
            claimBtn.textContent = "I'll do it!";
            claimBtn.disabled = false;
        } else if (task.status === 'in-progress' && task.assignee?.id === user?.uid) {
            claimBtn.classList.remove('hidden');
            claimBtn.textContent = "Mark Complete (Demo)";
            claimBtn.disabled = false; // Demo for now
        } else {
            claimBtn.classList.add('hidden');
        }

        claimBtn.onclick = async () => {
            if (!user) {
                alert("Please login.");
                return;
            }
            if (task.status !== 'open') {
                alert("Already claimed or completed.");
                return;
            }

            claimBtn.textContent = "Claiming...";
            claimBtn.disabled = true;

            try {
                await updateDoc(doc(db, "tasks", task.id), {
                    status: "in-progress",
                    assignee: {
                        id: user.uid,
                        name: user.displayName || user.email
                    }
                });
                closeModals();
            } catch (e) {
                console.error("Claim failed", e);
                alert("Could not claim task.");
                claimBtn.textContent = "I'll do it!";
                claimBtn.disabled = false;
            }
        };
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

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
}
