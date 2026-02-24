# Installation

Get SideQuest running locally in under 10 minutes. If it takes longer than that, check your internet connection and your relationship with Firebase's console UI.

---

## Prerequisites

| Requirement | Version | Notes |
|---|---|---|
| Modern browser | Chrome 90+, Firefox 90+, Safari 15+ | Must support ES Modules |
| Firebase account | Any | Free tier is sufficient |
| Local HTTP server | Any | Required — `file://` origins are blocked by CORS |

No Node.js required at runtime. No npm. No build step. Just a browser and a Firebase project.

---

## Step 1 — Fork & Clone

```bash
git clone https://github.com/Kaelith69/SideQuest.git
cd SideQuest
```

Or download the ZIP from GitHub and extract it. Same result.

---

## Step 2 — Create a Firebase Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com/)
2. Click **Add project** → give it a name (e.g. `sidequest-dev`)
3. Disable Google Analytics if you want (it's not used by SideQuest)
4. Click **Create project**

### Enable Authentication

1. In the Firebase Console, go to **Build → Authentication**
2. Click **Get started**
3. Under **Sign-in method**, enable **Email/Password**
4. Save

### Enable Firestore

1. Go to **Build → Firestore Database**
2. Click **Create database**
3. Start in **test mode** (you'll deploy proper rules in Step 4)
4. Choose a region close to your users

---

## Step 3 — Add Firebase Config

1. In the Firebase Console, go to **Project Settings** (gear icon) → **General**
2. Scroll to **Your apps** → click **Add app** → choose **Web app**
3. Register the app (nickname: `sidequest-web`, type: **Web app**)
4. Copy the `firebaseConfig` object

Open `js/firebase-config.js` and replace the placeholder values:

```javascript
// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

> ⚠️ **Never commit real credentials to a public repository.** Add `js/firebase-config.js` to `.gitignore` if this is a personal fork.

---

## Step 4 — Deploy Firestore Rules

The default "test mode" rules expire and allow unauthenticated access. Deploy the production-ready rules from `firestore.rules`:

```bash
# Install Firebase CLI (one-time)
npm install -g firebase-tools

# Log in
firebase login

# Link to your project
firebase use YOUR_PROJECT_ID

# Deploy rules only
firebase deploy --only firestore:rules
```

See [Security Guide](Security-Guide.md) for the full rules explanation.

---

## Step 5 — Start a Local Server

CORS prevents ES Modules from loading over `file://`. Use any HTTP server:

```bash
# Python 3 (built-in, no install needed)
python -m http.server 8000

# Node.js (no global install)
npx http-server . -p 8000 --cors

# VS Code
# Install "Live Server" extension → click "Go Live" in the status bar
```

---

## Step 6 — Open the App

Navigate to `http://localhost:8000` in your browser.

1. Click **Sign Up**
2. Enter a display name, email, and password
3. You will receive a **₹500 demo wallet** — it's fictional, but it's yours

---

## Troubleshooting Installation

### "Firebase: Error (auth/invalid-api-key)"
Your `firebaseConfig` credentials are wrong or the config file wasn't saved. Double-check that `apiKey` matches the value in Firebase Console → Project Settings.

### Map won't load / blank white area
This is usually a CORS issue from opening the file directly. Make sure you're accessing the app via `http://localhost:8000`, not `file:///path/to/index.html`.

### Firestore permission denied
Your security rules are too strict (or too lax and expired). Run `firebase deploy --only firestore:rules` again.

### Tasks not appearing on map
Check that Firestore is in the same region you selected during setup. Also confirm `tasks` collection exists (it's created automatically on first task post).

---

For more issues, see the full [Troubleshooting Guide](Troubleshooting.md).

---

[← Home](Home.md) | [Usage →](Usage.md)
