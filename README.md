# TaskPop 📍

**TaskPop** is a hyper-local, real-time community marketplace that connects neighbors to get things done. Built with modern web technologies, it allows users to post tasks, explore local opportunities on an interactive map, and earn money by helping others.

![Project Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- **🗺️ Interactive Map Interface**: Visualize tasks in your vicinity with a real-time, interactive map powered by MapLibre GL.
- **📍 Geolocation-Based**: Automatically center on your location to find relevant tasks nearby (within 3km).
- **📝 Post & Claim Tasks**: Easily post new tasks with rewards or claim tasks posted by others.
- **🔄 Complete Lifecycle**:
    - **Mark as Done**: Assignees mark tasks as finished.
    - **Confirm & Rate**: Posters confirm completion and rate the assignee (1-5 stars).
- **👤 User Profiles**:
    - **Stats**: Track tasks posted, completed, and your average rating.
    - **Edit Profile**: Update your display name easily.
    - **Reputation**: View user ratings on their avatar and profile.
- **🧹 Auto-Cleanup**: The system automatically removes "Open" tasks older than 24 hours to keep the map fresh.
- **📱 Responsive Design**: Fully responsive UI designed for both desktop and mobile experiences, featuring a bottom navigation bar for mobile feel.

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (CDN)
- **Map**: [MapLibre GL JS](https://maplibre.org/)
- **Backend / Database**: [Firebase](https://firebase.google.com/)
    - **Authentication**: Email/Password
    - **Firestore**: Real-time NoSQL Database
- **Icons**: SVG Icons (Heroicons style)

## 🚀 Getting Started

### Prerequisites

- A modern web browser.
- A Firebase project.

### Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/taskpop.git
    cd taskpop
    ```

2.  **Firebase Configuration**
    - Create a file named `js/firebase-config.js`.
    - Add your Firebase configuration keys:
    ```javascript
    // js/firebase-config.js
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
    import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
    import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_ID.appspot.com",
        messagingSenderId: "YOUR_SENDER_ID",
        appId: "YOUR_APP_ID"
    };

    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const db = getFirestore(app);
    ```

3.  **Run the App**
    Since this uses ES Modules, you need to serve it via a local server (opening `index.html` directly might cause CORS issues).
    
    Using Python:
    ```bash
    python -m http.server 8000
    ```
    Or using Node's `http-server`:
    ```bash
    npx http-server .
    ```

4.  **Open in Browser**
    Navigate to `http://localhost:8000`.

## 🗂️ Project Structure

```
taskpop/
├── index.html          # Main application entry point
├── styles/
│   └── main.css        # Custom styles & Tailwind overrides
├── js/
│   ├── app.js          # App initialization & navigation logic
│   ├── auth.js         # Firebase Authentication logic
│   ├── map.js          # MapLibre configuration & marker logic
│   ├── tasks.js        # Task CRUD, lifecycle, & profile logic
│   └── firebase-config.js # (You create this) Firebase config
└── README.md           # Project documentation
```

## 🔒 Security Note

The current Firestore rules are set for development ease (`allow read, write: if request.time < timestamp.date(2026, 1, 30);`). For production, ensure you update `firestore.rules` to strictly secure your data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if request.auth != null && (resource.data.poster.id == request.auth.uid || resource.data.assignee.id == request.auth.uid);
      allow delete: if request.auth != null && resource.data.poster.id == request.auth.uid;
    }
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
