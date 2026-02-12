# SideQuest 🚀🌕

> "Stonks only go up." - *Warren Buffett (probably)*

**SideQuest** is the app you didn't know you needed until you realized you're too lazy to walk your dog or get groceries. It's a hyper-local, real-time marketplace that connects you with neighbors who will do your chores for sweet, sweet Rupee (₹).

Think of it as IRL side-quests. 🎮

![Status: It Works on My Machine](https://img.shields.io/badge/Status-It_Works_On_My_Machine-success?style=for-the-badge)
![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## 📚 [**Read the Complete Wiki**](wiki/Home.md)

For comprehensive documentation, guides, and tutorials, check out our [**detailed wiki**](wiki/Home.md):
- 📖 [User Guide](wiki/User-Guide.md) - Learn how to use SideQuest
- 💻 [Development Guide](wiki/Development-Guide.md) - Contribute to the project
- 🔒 [Security Guide](wiki/Security-Guide.md) - Best practices and security
- 🚀 [Deployment Guide](wiki/Deployment-Guide.md) - Deploy to production
- ❓ [FAQ](wiki/FAQ.md) - Common questions answered

---

## 🧐 What dis?

One does not simply *get things done*. That's why we built SideQuest.
- **You**: Have money (₹), no time/energy.
- **Neighbor**: Has time/energy, wants money (₹).
- **SideQuest**: *Now kith.* 🤝

We use a fancy **Interactive Map** so you can see exactly where the help is coming from (creepy? maybe. useful? absolutely).

## ✨ Features (The Good Stuff)

*   **🗺️ Map Goes Brrr**: Real-time map powered by MapLibre. Zoom in, zoom out, pretend you're a spy satellite.
*   **📍 You Are Here**: We find you. Automatically. (Please allow location access, we promise not to sell your data... mostly).
*   **💸 Money Printer**:
    *   **Post Tasks**: "Someone pls fix my printer" -> Offer ₹500.
    *   **Escrow Logic**: We take your money *immediately* (so you don't ghost). We hold it safe. 🔒
    *   **Get Paid**: You do the thing -> You get the bling. 💰
*   **👤 Profiles**:
    *   See your **Wallet Balance** grow. 📈
    *   flex your **5-star rating** because you are a good noodle.
*   **🧹 Auto-Janitor**: Tasks older than 24h get YEETED into the void. Keeps the map fresh.

## 🛠️ The "Secret Sauce" (Tech Stack)

Built with love and caffeine. ☕
*   **Frontend**: Vanilla JS (No frameworks were harmed in the making of this).
*   **Styling**: Tailwind CSS (because writing CSS is hard).
*   **Map**: MapLibre GL JS.
*   **Backend**: Firebase (Firestore + Auth). It just works.

## 🚀 How to Run (Don't Break It)

### Prerequisites
*   A browser that isn't Internet Explorer.
*   A Firebase project (Go make one, it's free).

### Installation

1.  **Steal the Code** (Clone it)
    ```bash
    git clone https://github.com/Kaelith69/sidequest.git
    cd sidequest
    ```
    *Hacker voice: "I'm in."* 🕶️

2.  **The Boring Config Part**
    *   Create `js/firebase-config.js`.
    *   Paste your Firebase keys (don't share these or we will find you):
    ```javascript
    // js/firebase-config.js
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
    import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
    import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        // ... the rest of the alphabet soup
        projectId: "your-project-id",
    };

    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const db = getFirestore(app);
    ```

3.  **Fire it Up** 🔥
    You can't just open `index.html`. CORS will yell at you. Use a server:
    ```bash
    # Python Gang
    python -m http.server 8000

    # Node Gang
    npx http-server .
    ```

4.  **Profit**
    Go to `http://localhost:8000` and start your empire.

## 📂 Structure
```
sidequest/
├── index.html          # Where the magic starts
├── styles/             # Making things look pretty
├── js/                 # The big brain logic 🧠
│   ├── app.js          # The conductor
│   ├── tasks.js        # The money handler
│   └── map.js          # The cartographer
└── README.md           # You are reading this
```

## 🔒 Security (Serious Note)

Currently, our Firestore rules are basically "Come on in, the door is unlocked."
**Please** update `firestore.rules` before you deploy this or hackers will steal your fake internet points.

## 📄 License

MIT License. Do whatever you want. Just don't blame us if your toaster explodes.

---
*Made with 💻 and 🍕 by Kaelith69*
