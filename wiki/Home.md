# Welcome to the SideQuest Wiki 🚀

<div align="center">

[![Version](https://img.shields.io/badge/version-1.0.0-007AFF?style=for-the-badge)](https://github.com/Kaelith69/SideQuest)
[![License: MIT](https://img.shields.io/badge/License-MIT-5AC8FA?style=for-the-badge)](https://github.com/Kaelith69/SideQuest/blob/main/LICENSE)
[![Status](https://img.shields.io/badge/Status-It_Works_On_My_Machine-34C759?style=for-the-badge)](https://github.com/Kaelith69/SideQuest)

</div>

**SideQuest** is a hyper-local, real-time task marketplace that connects neighbours. It is powered by real-time maps, atomic escrow payments, and a mobile-first interface — with zero build steps and zero custom backend.

> *"You have money but no time. Your neighbour has time but needs money. SideQuest: now kith."* 🤝

---

## 🎯 What is SideQuest?

SideQuest bridges the gap between people who need help with everyday tasks and neighbours who have time to help. Post a quest, set a ₹ reward, and let someone nearby earn it.

**The Formula:**

| You | Neighbour | Result |
|---|---|---|
| Have ₹, no time | Has time, needs ₹ | SideQuest connects you |

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🗺️ **Live Map** | Real-time task pins via MapLibre GL JS on OpenStreetMap tiles |
| 💰 **Escrow Wallet** | Atomic Firestore transactions — no double-spend, ever |
| 👥 **Profiles & Ratings** | 1–5 star ratings, wallet balance, task history |
| 📱 **Mobile-First** | Safe-area insets, `svh` units, bottom-sheet modals |
| 🧹 **Auto-Cleanup** | Tasks older than 24 h are automatically removed |
| 🔍 **Search & Filter** | Category chips + full-text search |

---

## 📚 Wiki Pages

### Core Docs
- **[Architecture](Architecture.md)** — System design, modules, and data flow
- **[Installation](Installation.md)** — Set up SideQuest locally
- **[Usage](Usage.md)** — How to post, claim, and complete tasks

### Reference
- **[Privacy](Privacy.md)** — What data is collected and why
- **[Security Guide](Security-Guide.md)** — Firestore rules and security model
- **[Roadmap](Roadmap.md)** — Planned features and future direction

### Help
- **[Troubleshooting](Troubleshooting.md)** — Common issues and fixes
- **[FAQ](FAQ.md)** — Frequently asked questions

### Extended Reference
- **[Technical Architecture](Technical-Architecture.md)** — Deep-dive component reference
- **[Database Schema](Database-Schema.md)** — Firestore data structures
- **[API Reference](API-Reference.md)** — Module function documentation
- **[Development Guide](Development-Guide.md)** — Coding conventions and contributing
- **[Deployment Guide](Deployment-Guide.md)** — Deploy to production

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | Tailwind CSS (CDN) |
| Scripting | Vanilla JS ES Modules |
| Map | MapLibre GL JS 3.6.2 |
| Auth | Firebase Auth 10.7.1 |
| Database | Cloud Firestore 10.7.1 |
| Hosting | Any static host |

---

## 🚀 Quick Links

- [GitHub Repository](https://github.com/Kaelith69/SideQuest)
- [Report a Bug](https://github.com/Kaelith69/SideQuest/issues/new)
- [Report a Security Issue](https://github.com/Kaelith69/SideQuest/security/advisories/new)
- [CHANGELOG](https://github.com/Kaelith69/SideQuest/blob/main/CHANGELOG.md)

---

**Ready?** Start with the [Installation Guide](Installation.md).

*Made with 💻 and ☕ by [Kaelith69](https://github.com/Kaelith69)*
