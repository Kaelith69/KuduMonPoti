<div align="center">

<!-- SVG Hero Banner -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 220" width="800" height="220" role="img" aria-label="SideQuest Banner">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0A0F2C;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1A1F4C;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#007AFF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#5AC8FA;stop-opacity:1" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="800" height="220" fill="url(#bg)" rx="16"/>
  <!-- Grid lines -->
  <g stroke="#ffffff08" stroke-width="1">
    <line x1="0" y1="44" x2="800" y2="44"/><line x1="0" y1="88" x2="800" y2="88"/>
    <line x1="0" y1="132" x2="800" y2="132"/><line x1="0" y1="176" x2="800" y2="176"/>
    <line x1="100" y1="0" x2="100" y2="220"/><line x1="200" y1="0" x2="200" y2="220"/>
    <line x1="300" y1="0" x2="300" y2="220"/><line x1="400" y1="0" x2="400" y2="220"/>
    <line x1="500" y1="0" x2="500" y2="220"/><line x1="600" y1="0" x2="600" y2="220"/>
    <line x1="700" y1="0" x2="700" y2="220"/>
  </g>
  <!-- Glowing map pin icon -->
  <g filter="url(#glow)" transform="translate(80, 55)">
    <circle cx="40" cy="38" r="26" fill="url(#accent)" opacity="0.9"/>
    <path d="M40 14 C26 14 16 24 16 36 C16 52 40 72 40 72 C40 72 64 52 64 36 C64 24 54 14 40 14Z" fill="url(#accent)"/>
    <circle cx="40" cy="36" r="10" fill="#0A0F2C"/>
  </g>
  <!-- Title -->
  <text x="155" y="95" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="58" font-weight="800" fill="url(#accent)" filter="url(#glow)">SideQuest</text>
  <!-- Tagline -->
  <text x="157" y="130" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="18" font-weight="400" fill="#8E8E93">Hyper-local task marketplace for neighbours</text>
  <!-- Version badge -->
  <rect x="157" y="150" width="72" height="24" rx="12" fill="#007AFF" opacity="0.85"/>
  <text x="193" y="167" font-family="monospace" font-size="12" font-weight="700" fill="#fff" text-anchor="middle">v1.0.0</text>
  <!-- Tech tags -->
  <rect x="240" y="150" width="72" height="24" rx="12" fill="#ffffff12"/>
  <text x="276" y="167" font-family="monospace" font-size="12" fill="#5AC8FA" text-anchor="middle">Firebase</text>
  <rect x="323" y="150" width="82" height="24" rx="12" fill="#ffffff12"/>
  <text x="364" y="167" font-family="monospace" font-size="12" fill="#5AC8FA" text-anchor="middle">MapLibre</text>
  <rect x="416" y="150" width="60" height="24" rx="12" fill="#ffffff12"/>
  <text x="446" y="167" font-family="monospace" font-size="12" fill="#5AC8FA" text-anchor="middle">Vanilla</text>
  <!-- Decorative dots -->
  <circle cx="740" cy="50" r="30" fill="#007AFF" opacity="0.07"/>
  <circle cx="760" cy="170" r="18" fill="#5AC8FA" opacity="0.07"/>
  <circle cx="690" cy="110" r="50" fill="#007AFF" opacity="0.04"/>
</svg>

---

[![Version](https://img.shields.io/badge/version-1.0.0-007AFF?style=for-the-badge&logo=semver&logoColor=white)](https://github.com/Kaelith69/SideQuest)
[![License: MIT](https://img.shields.io/badge/License-MIT-5AC8FA?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES_Modules-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
[![Firebase](https://img.shields.io/badge/Firebase-10.7.1-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CDN-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MapLibre](https://img.shields.io/badge/MapLibre-3.6.2-396CB2?style=for-the-badge&logo=maplibre&logoColor=white)](https://maplibre.org/)
[![Status](https://img.shields.io/badge/Status-Active-34C759?style=for-the-badge)](https://github.com/Kaelith69/SideQuest)

</div>

---

## 📑 Table of Contents

- [What Is SideQuest?](#-what-is-sidequest)
- [Architecture](#️-architecture)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Setup & Installation](#-setup--installation)
- [Usage Examples](#-usage-examples)
- [Security](#-security)
- [Roadmap](#️-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎮 What Is SideQuest?

**SideQuest** is a hyper-local, real-time task marketplace that connects neighbours. Got groceries to grab, a couch to move, or a dog that needs walking? Post a quest, set a Rupee (₹) reward, and let a neighbour earn it.

> Think of it as IRL side-quests. 🎮
>
> *"You have money but no time. Your neighbour has time but needs money. SideQuest: now kith."* 🤝

---

## 🏛️ Architecture

SideQuest is a **client-side Single-Page Application (SPA)** with no build step — just open a browser.

```
┌──────────────────────────────────────────────────────────────┐
│                        Browser (SPA)                         │
│  ┌────────────┐  ┌────────────┐  ┌──────────┐  ┌─────────┐  │
│  │  index.html│  │  app.js    │  │  map.js  │  │ tasks.js│  │
│  │  (Shell)   │→ │(Orchestrat)│→ │(MapLibre)│  │(Firestore│  │
│  └────────────┘  └─────┬──────┘  └────┬─────┘  └────┬────┘  │
│                        │              │              │        │
│               ┌────────┴──────────────┴──────────────┘        │
│               ↓                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              Firebase (Google Cloud)                    │  │
│  │   ┌─────────────────┐    ┌──────────────────────────┐  │  │
│  │   │  Firebase Auth  │    │  Firestore (Real-time DB) │  │  │
│  │   │  (Email/Pass)   │    │  /tasks  /users           │  │  │
│  │   └─────────────────┘    └──────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Auth** — `auth.js` handles sign-in/sign-up; `app.js` reacts via `onAuthStateChanged`.
2. **Map** — `map.js` renders an OpenStreetMap tile layer via MapLibre GL JS and exposes location events.
3. **Tasks** — `tasks.js` subscribes to Firestore in real-time; adds/removes map markers; handles escrow transactions.
4. **UI** — `ui.js` provides a shared `showToast` and `showConfirm` utility used across modules.

### Escrow Model

```
Post Task (₹ deducted immediately from poster wallet)
    ↓
Assignee claims → status: in-progress
    ↓
Assignee marks done → status: pending-confirmation
    ↓
Poster rates & confirms → status: completed
    ↓
Reward (₹) credited to assignee wallet (Firestore transaction)
```

All balance mutations use **Firestore atomic transactions** to prevent race conditions.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗺️ **Live Map** | OpenStreetMap tiles via MapLibre GL JS; task pins within 0.5 km radius |
| 📍 **Geolocation** | Auto-centre on user; live `watchPosition` updates |
| 📝 **Post Tasks** | Title, category, description, optional ₹ reward |
| 💰 **Escrow Wallet** | Reward locked on post; refunded on delete; paid out on completion |
| 🔍 **Filter & Search** | Filter by category chip; full-text search across title & description |
| 👤 **Profiles** | Editable display name; wallet balance; stats (posted, completed, avg rating) |
| ⭐ **Ratings** | 1–5 star rating on task completion; running average per user |
| 🧹 **Auto-Cleanup** | `open` tasks older than 24 h are automatically deleted from Firestore |
| 📱 **Mobile-First** | Safe-area insets, `svh` viewport units, bottom-sheet modals |
| 💬 **Toast Notifications** | Non-blocking feedback for all async operations |

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Markup | HTML5 | App shell & UI structure |
| Styling | Tailwind CSS (CDN) | Utility-first responsive styling |
| Scripting | Vanilla ES Modules | Zero-dependency logic |
| Map | MapLibre GL JS 3.6.2 | Vector/raster tile rendering |
| Auth | Firebase Auth 10.7.1 | Email/password authentication |
| Database | Cloud Firestore 10.7.1 | Real-time NoSQL document store |
| Hosting | Any static host | No server required |

---

## 📂 Project Structure

```
SideQuest/
├── index.html              # App shell — all views rendered here
├── firestore.rules         # Firestore security rules
├── FUNCTION_SPEC.md        # Implementation checklist
├── LICENSE
│
├── styles/
│   ├── main.css            # Custom animations, markers, glass utilities
│   └── tailwind.css        # (reference / purged output)
│
├── js/
│   ├── firebase-config.js  # Firebase initialisation & exports
│   ├── auth.js             # Sign-in, sign-up, logout handlers
│   ├── app.js              # Entry point — auth state → show/hide views
│   ├── map.js              # MapLibre map, geolocation, marker helpers
│   ├── tasks.js            # Task CRUD, filters, navigation, profile, ratings
│   └── ui.js               # showToast(), showConfirm() utilities
│
└── wiki/                   # Extended documentation
    ├── Home.md
    ├── User-Guide.md
    ├── Development-Guide.md
    ├── Technical-Architecture.md
    ├── API-Reference.md
    ├── Database-Schema.md
    ├── Security-Guide.md
    ├── Deployment-Guide.md
    ├── Roadmap.md
    ├── FAQ.md
    └── Troubleshooting.md
```

---

## 🚀 Setup & Installation

### Prerequisites

- A modern browser (Chrome 90+, Firefox 90+, Safari 15+)
- A [Firebase project](https://console.firebase.google.com/) with **Authentication** (Email/Password) and **Firestore** enabled
- A local HTTP server (CORS blocks `file://` origins)

### 1 — Clone the Repository

```bash
git clone https://github.com/Kaelith69/SideQuest.git
cd SideQuest
```

### 2 — Configure Firebase

Open `js/firebase-config.js` and replace the placeholder values with your own project credentials (find them in **Project Settings → General → Your apps**):

```javascript
// js/firebase-config.js
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

> **Never commit real credentials to a public repository.**

### 3 — Deploy Firestore Rules

```bash
# Install Firebase CLI if you haven't already
npm install -g firebase-tools

firebase login
firebase deploy --only firestore:rules
```

### 4 — Start a Local Server

```bash
# Python (built-in)
python -m http.server 8000

# Node.js
npx http-server . -p 8000

# VS Code
# Install the "Live Server" extension, then click "Go Live"
```

### 5 — Open the App

Navigate to `http://localhost:8000` in your browser. Sign up for an account — you'll receive a ₹500 demo wallet to start posting tasks.

---

## 💡 Usage Examples

### Posting a Task

1. Sign in and tap the **＋** FAB button on the map.
2. Fill in a title, pick a category, and optionally set a ₹ reward.
3. Tap **Post Task** — the reward is immediately escrowed from your wallet.

### Claiming a Task

1. Tap any task marker on the map (visible within 0.5 km of you).
2. Review the details and tap **I'll do it!**
3. Complete the work, then tap **Mark as Done**.
4. Wait for the poster to confirm — you'll receive the reward.

### Searching & Filtering

```
Search bar   → full-text match on title & description
Category chips → filter by Help / Delivery / Social
```

---

## 🔒 Security

| Concern | Mitigation |
|---|---|
| Firestore access | Auth-gated rules in `firestore.rules`; users can only mutate their own documents or tasks they posted/claimed |
| Balance mutations | All wallet changes use **Firestore atomic transactions** to prevent double-spend |
| Reward overflow | Server-side rule check: `rewardAmount <= currentBalance` enforced in transaction before write |
| Stale tasks | Tasks older than 24 h are auto-deleted on the client snapshot callback |
| XSS | Toast messages are set via `textContent` / template literals that do not include user-supplied HTML |

> See [Security Guide](wiki/Security-Guide.md) for full details.

---

## 🗺️ Roadmap

- [ ] Push notifications for task status updates
- [ ] Image attachments on task posts
- [ ] In-app chat between poster and assignee
- [ ] Apple/Google Pay integration
- [ ] PWA offline support

See [Roadmap](wiki/Roadmap.md) for the full list.

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

See [Development Guide](wiki/Development-Guide.md) for coding conventions.

---

<div align="center">

> *(Here's a great spot for a quirky loading GIF — something like a pixelated character running on a map. Try [giphy.com/search/pixel+map](https://giphy.com/search/pixel+map).)*

---

## 📄 License

MIT License — do whatever you want. See [LICENSE](LICENSE) for details.

---

*Made with 💻 and ☕ by [Kaelith69](https://github.com/Kaelith69)*

---

> **Why do programmers prefer dark mode?**
> *Because light attracts bugs.* 🐛

</div>

