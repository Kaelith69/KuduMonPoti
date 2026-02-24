# Architecture

Deep dive into how SideQuest is built — the modules, the data flow, and the philosophy of *just open a browser and it works*.

---

## Overview

SideQuest is a **zero-build, client-side Single-Page Application (SPA)**. There is no webpack, no Vite, no npm install, and no custom server. The browser is the runtime. Firebase is the backend.

```
Browser (SPA)
  └─ index.html          ← app shell
       ├─ app.js          ← orchestrator
       ├─ auth.js         ← Firebase Auth
       ├─ map.js          ← MapLibre GL JS
       ├─ tasks.js        ← Firestore CRUD
       └─ ui.js           ← toast / confirm utilities

Firebase (Google Cloud)
  ├─ Firebase Auth        ← email/password, JWT tokens
  └─ Cloud Firestore      ← /tasks, /users, real-time listeners

MapLibre Tiles CDN
  └─ OpenStreetMap tiles  ← vector/raster tile server
```

---

## Module Responsibilities

| Module | Role | Key Exports |
|---|---|---|
| `firebase-config.js` | SDK init | `auth`, `db` |
| `app.js` | Auth state router | `init()`, `showAuth()`, `showApp()` |
| `auth.js` | Sign in / up / out | `handleLogin()`, `handleSignup()`, `logout()` |
| `map.js` | Map + markers | `initMap()`, `addMarker()`, `updateUserMarker()` |
| `tasks.js` | Task CRUD + wallet | `createTask()`, `claimTask()`, `listenForTasks()` |
| `ui.js` | Shared utilities | `showToast()`, `showConfirm()` |

---

## SVG Architecture Diagram

<div align="center">

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 380" width="720" height="380" role="img" aria-label="SideQuest Architecture">
  <defs>
    <linearGradient id="wa-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0D1333;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#0A0F2C;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="wa-blue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#007AFF;stop-opacity:0.9"/>
      <stop offset="100%" style="stop-color:#0056CC;stop-opacity:0.9"/>
    </linearGradient>
  </defs>
  <rect width="720" height="380" fill="url(#wa-bg)" rx="14"/>
  <text x="360" y="26" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">SideQuest — Module Architecture</text>
  <!-- Browser layer -->
  <rect x="20" y="40" width="680" height="155" rx="10" fill="#ffffff04" stroke="#007AFF" stroke-width="1" stroke-dasharray="5,3"/>
  <text x="38" y="58" font-family="Arial, sans-serif" font-size="11" fill="#5AC8FA" font-weight="600">Browser Layer (SPA)</text>
  <!-- index.html -->
  <rect x="40" y="68" width="100" height="100" rx="8" fill="url(#wa-blue)"/>
  <text x="90" y="95" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">index.html</text>
  <text x="90" y="111" font-family="Arial, sans-serif" font-size="9" fill="#cce4ff" text-anchor="middle">App Shell</text>
  <text x="90" y="125" font-family="Arial, sans-serif" font-size="9" fill="#cce4ff" text-anchor="middle">All views</text>
  <text x="90" y="139" font-family="Arial, sans-serif" font-size="9" fill="#cce4ff" text-anchor="middle">rendered here</text>
  <!-- Arrows from index.html to modules -->
  <line x1="141" y1="118" x2="178" y2="118" stroke="#5AC8FA" stroke-width="1.5"/>
  <!-- app.js -->
  <rect x="180" y="68" width="90" height="44" rx="8" fill="#1A3A4C" stroke="#007AFF" stroke-width="1"/>
  <text x="225" y="87" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#5AC8FA" text-anchor="middle">app.js</text>
  <text x="225" y="102" font-family="Arial, sans-serif" font-size="9" fill="#8E8E93" text-anchor="middle">Orchestrator</text>
  <!-- auth.js -->
  <rect x="180" y="124" width="90" height="44" rx="8" fill="#1A3A4C" stroke="#007AFF" stroke-width="1"/>
  <text x="225" y="143" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#5AC8FA" text-anchor="middle">auth.js</text>
  <text x="225" y="158" font-family="Arial, sans-serif" font-size="9" fill="#8E8E93" text-anchor="middle">Auth handlers</text>
  <!-- map.js -->
  <rect x="295" y="68" width="90" height="44" rx="8" fill="#1A3A4C" stroke="#5AC8FA" stroke-width="1"/>
  <text x="340" y="87" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#5AC8FA" text-anchor="middle">map.js</text>
  <text x="340" y="102" font-family="Arial, sans-serif" font-size="9" fill="#8E8E93" text-anchor="middle">MapLibre GL</text>
  <!-- tasks.js -->
  <rect x="295" y="124" width="90" height="44" rx="8" fill="#1A3A4C" stroke="#34C759" stroke-width="1"/>
  <text x="340" y="143" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#34C759" text-anchor="middle">tasks.js</text>
  <text x="340" y="158" font-family="Arial, sans-serif" font-size="9" fill="#8E8E93" text-anchor="middle">CRUD + wallet</text>
  <!-- ui.js -->
  <rect x="410" y="96" width="90" height="44" rx="8" fill="#1A3A4C" stroke="#FF9500" stroke-width="1"/>
  <text x="455" y="115" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#FF9500" text-anchor="middle">ui.js</text>
  <text x="455" y="130" font-family="Arial, sans-serif" font-size="9" fill="#8E8E93" text-anchor="middle">Toast / Confirm</text>
  <!-- firebase-config -->
  <rect x="540" y="68" width="120" height="100" rx="8" fill="#1A3A4C" stroke="#FFCA28" stroke-width="1"/>
  <text x="600" y="92" font-family="Arial, sans-serif" font-size="10" font-weight="700" fill="#FFCA28" text-anchor="middle">firebase-config.js</text>
  <text x="600" y="108" font-family="Arial, sans-serif" font-size="9" fill="#8E8E93" text-anchor="middle">initializeApp()</text>
  <text x="600" y="122" font-family="Arial, sans-serif" font-size="9" fill="#8E8E93" text-anchor="middle">export auth</text>
  <text x="600" y="136" font-family="Arial, sans-serif" font-size="9" fill="#8E8E93" text-anchor="middle">export db</text>
  <!-- Firebase layer -->
  <rect x="20" y="215" width="680" height="140" rx="10" fill="#ffffff04" stroke="#34C759" stroke-width="1" stroke-dasharray="5,3"/>
  <text x="38" y="233" font-family="Arial, sans-serif" font-size="11" fill="#34C759" font-weight="600">Firebase (Google Cloud)</text>
  <rect x="60" y="245" width="190" height="80" rx="8" fill="#0D2233" stroke="#007AFF" stroke-width="1"/>
  <text x="155" y="268" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#5AC8FA" text-anchor="middle">Firebase Auth</text>
  <text x="155" y="285" font-family="Arial, sans-serif" font-size="10" fill="#8E8E93" text-anchor="middle">Email/Password</text>
  <text x="155" y="300" font-family="Arial, sans-serif" font-size="10" fill="#8E8E93" text-anchor="middle">JWT token → Firestore rules</text>
  <rect x="285" y="245" width="190" height="80" rx="8" fill="#0D2233" stroke="#34C759" stroke-width="1"/>
  <text x="380" y="268" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#34C759" text-anchor="middle">Cloud Firestore</text>
  <text x="380" y="285" font-family="Arial, sans-serif" font-size="10" fill="#8E8E93" text-anchor="middle">/tasks /users</text>
  <text x="380" y="300" font-family="Arial, sans-serif" font-size="10" fill="#8E8E93" text-anchor="middle">Real-time listeners + transactions</text>
  <rect x="510" y="245" width="160" height="80" rx="8" fill="#0D2233" stroke="#5AC8FA" stroke-width="1"/>
  <text x="590" y="268" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#5AC8FA" text-anchor="middle">Tile CDN</text>
  <text x="590" y="285" font-family="Arial, sans-serif" font-size="10" fill="#8E8E93" text-anchor="middle">OpenStreetMap</text>
  <text x="590" y="300" font-family="Arial, sans-serif" font-size="10" fill="#8E8E93" text-anchor="middle">Vector/Raster tiles</text>
  <!-- Vertical connector -->
  <line x1="360" y1="170" x2="360" y2="213" stroke="#007AFF" stroke-width="1.5"/>
  <polygon points="355,213 360,220 365,213" fill="#007AFF"/>
  <text x="367" y="196" font-family="Arial, sans-serif" font-size="10" fill="#5AC8FA">HTTPS / WSS</text>
  <!-- Bottom note -->
  <text x="360" y="370" font-family="Arial, sans-serif" font-size="10" fill="#555f7a" text-anchor="middle">No custom server • No build pipeline • No npm install required</text>
</svg>

</div>

---

## Data Flow

### Auth Flow

```
User submits credentials
  → Firebase Auth validates
  → JWT token issued and cached in browser
  → onAuthStateChanged() fires in app.js
  → showApp(user) or showAuth()
```

### Task Lifecycle

```
User taps ＋ FAB
  → createTask() validates form
  → Firestore runTransaction():
      ├─ Check wallet balance ≥ reward
      ├─ Deduct reward from /users/{uid}.wallet
      └─ Add document to /tasks
  → Real-time listener fires handleSnapshot()
  → addMarker() places pin on map
```

### Escrow & Completion

```
Claim:   tasks.js updates task.status = "in-progress"
Done:    assignee calls completeTask()
Confirm: poster rates (1-5 ★) → runTransaction():
            ├─ Add reward to assignee wallet
            ├─ Update assignee ratingCount / totalRating
            └─ Set task.status = "completed"
         → Real-time listener removes marker
```

---

## Firestore Data Model

### `/users/{uid}`

```javascript
{
  uid: string,
  name: string,
  email: string,
  wallet: number,          // ₹ balance
  tasksCompleted: number,
  tasksPosted: number,
  totalRating: number,     // sum of all ratings received
  ratingCount: number,
  createdAt: Timestamp,
  lastActive: Timestamp
}
```

### `/tasks/{taskId}`

```javascript
{
  title: string,
  description: string,
  category: "Help" | "Delivery" | "Social" | "Other",
  reward: number,          // 0 for no reward
  status: "open" | "in-progress" | "completed",
  location: { lat: number, lng: number },
  postedBy: string,        // uid
  postedByName: string,
  claimedBy: string | null,
  claimedByName: string | null,
  createdAt: Timestamp,
  claimedAt: Timestamp | null,
  completedAt: Timestamp | null,
  escrowHeld: boolean,
  rated: boolean
}
```

---

## Security Rules Summary

Firestore rules enforce:

- Only authenticated users can read or write
- Users can only update their own `/users` document
- Users can only delete tasks they posted
- Users cannot claim their own tasks
- Wallet mutations only happen inside server-validated transactions

See [Security Guide](Security-Guide.md) for the full rules.

---

## Map Architecture

MapLibre GL JS renders OpenStreetMap tiles. Markers are managed as a `Map<taskId, Marker>` in memory:

```javascript
const markers = new Map();   // taskId → maplibregl.Marker

// Add
const el = document.createElement('div');
el.className = 'task-marker';
const marker = new maplibregl.Marker({ element: el })
  .setLngLat([task.location.lng, task.location.lat])
  .addTo(map);
markers.set(task.id, marker);

// Remove
markers.get(taskId)?.remove();
markers.delete(taskId);
```

Distance is calculated with the Haversine formula to determine which tasks are within the 0.5 km display radius.

---

[← Home](Home.md) | [Installation →](Installation.md)
