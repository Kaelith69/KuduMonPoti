<div align="center">

<!-- SVG Hero Banner -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 220" width="800" height="220" role="img" aria-label="SideQuest Banner">
  <defs>
    <linearGradient id="sq-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0A0F2C;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1A1F4C;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="sq-accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#007AFF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#5AC8FA;stop-opacity:1" />
    </linearGradient>
    <filter id="sq-glow">
      <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="800" height="220" fill="url(#sq-bg)" rx="16"/>
  <g stroke="#ffffff08" stroke-width="1">
    <line x1="0" y1="44" x2="800" y2="44"/><line x1="0" y1="88" x2="800" y2="88"/>
    <line x1="0" y1="132" x2="800" y2="132"/><line x1="0" y1="176" x2="800" y2="176"/>
    <line x1="100" y1="0" x2="100" y2="220"/><line x1="200" y1="0" x2="200" y2="220"/>
    <line x1="300" y1="0" x2="300" y2="220"/><line x1="400" y1="0" x2="400" y2="220"/>
    <line x1="500" y1="0" x2="500" y2="220"/><line x1="600" y1="0" x2="600" y2="220"/>
    <line x1="700" y1="0" x2="700" y2="220"/>
  </g>
  <g filter="url(#sq-glow)" transform="translate(80, 55)">
    <path d="M40 14 C26 14 16 24 16 36 C16 52 40 72 40 72 C40 72 64 52 64 36 C64 24 54 14 40 14Z" fill="url(#sq-accent)"/>
    <circle cx="40" cy="36" r="10" fill="#0A0F2C"/>
  </g>
  <text x="155" y="95" font-family="Arial, sans-serif" font-size="58" font-weight="800" fill="url(#sq-accent)" filter="url(#sq-glow)">SideQuest</text>
  <text x="157" y="130" font-family="Arial, sans-serif" font-size="18" font-weight="400" fill="#8E8E93">Hyper-local task marketplace for neighbours</text>
  <rect x="157" y="150" width="72" height="24" rx="12" fill="#007AFF" opacity="0.85"/>
  <text x="193" y="167" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#fff" text-anchor="middle">v1.0.0</text>
  <rect x="240" y="150" width="72" height="24" rx="12" fill="#ffffff12"/>
  <text x="276" y="167" font-family="Arial, sans-serif" font-size="12" fill="#5AC8FA" text-anchor="middle">Firebase</text>
  <rect x="323" y="150" width="82" height="24" rx="12" fill="#ffffff12"/>
  <text x="364" y="167" font-family="Arial, sans-serif" font-size="12" fill="#5AC8FA" text-anchor="middle">MapLibre</text>
  <rect x="416" y="150" width="60" height="24" rx="12" fill="#ffffff12"/>
  <text x="446" y="167" font-family="Arial, sans-serif" font-size="12" fill="#5AC8FA" text-anchor="middle">Vanilla</text>
  <circle cx="740" cy="50" r="30" fill="#007AFF" opacity="0.07"/>
  <circle cx="760" cy="170" r="18" fill="#5AC8FA" opacity="0.07"/>
  <circle cx="690" cy="110" r="50" fill="#007AFF" opacity="0.04"/>
</svg>

<br/>

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
- [System Overview](#-system-overview)
- [Features](#-features)
- [Architecture](#️-architecture)
- [Installation](#-setup--installation)
- [Usage](#-usage-examples)
- [Project Structure](#-project-structure)
- [Privacy](#-privacy)
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
>
> *No cloud middleman fees. No VC-funded dark patterns. No "we pivoted to crypto" plot twist.  
> Just you, your neighbour, and an honest transaction backed by Firestore atomic writes.*

<br/>

<div align="center">

![Humor](https://media.giphy.com/media/077i6AULCXc0FKTj9s/giphy.gif)

</div>

---

## 🌐 System Overview

SideQuest is a **zero-build, client-side Single-Page Application**. No webpack. No npm install. No 47-minute CI pipeline. You clone it, configure Firebase, open a browser, and it *works*. Revolutionary, we know.

| Property | Value |
|---|---|
| Build System | None (you're welcome) |
| Backend | Firebase (Google Cloud) |
| Bundle Size | Whatever your browser downloads |
| Server Cost | $0 (until you go viral) |
| Time to First Meaningful Paint | Fast enough |

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

<br/>

<div align="center">

<!-- SVG Capability Graph -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 320" width="760" height="320" role="img" aria-label="SideQuest Capability Graph">
  <defs>
    <linearGradient id="cap-bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#0D1333;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#0A0F2C;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="cap-bar1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#007AFF;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#5AC8FA;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="cap-bar2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#34C759;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#30D158;stop-opacity:0.7"/>
    </linearGradient>
  </defs>
  <rect width="760" height="320" fill="url(#cap-bg)" rx="14"/>
  <text x="380" y="34" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">Capability Overview</text>
  <!-- Labels -->
  <text x="148" y="68" font-family="Arial, sans-serif" font-size="11" fill="#8E8E93" text-anchor="end">Live Map</text>
  <text x="148" y="103" font-family="Arial, sans-serif" font-size="11" fill="#8E8E93" text-anchor="end">Geolocation</text>
  <text x="148" y="138" font-family="Arial, sans-serif" font-size="11" fill="#8E8E93" text-anchor="end">Post Tasks</text>
  <text x="148" y="173" font-family="Arial, sans-serif" font-size="11" fill="#8E8E93" text-anchor="end">Escrow Wallet</text>
  <text x="148" y="208" font-family="Arial, sans-serif" font-size="11" fill="#8E8E93" text-anchor="end">Search &amp; Filter</text>
  <text x="148" y="243" font-family="Arial, sans-serif" font-size="11" fill="#8E8E93" text-anchor="end">Ratings</text>
  <text x="148" y="278" font-family="Arial, sans-serif" font-size="11" fill="#8E8E93" text-anchor="end">Mobile-First</text>
  <!-- Track backgrounds -->
  <rect x="158" y="56" width="560" height="16" rx="8" fill="#ffffff0a"/>
  <rect x="158" y="91" width="560" height="16" rx="8" fill="#ffffff0a"/>
  <rect x="158" y="126" width="560" height="16" rx="8" fill="#ffffff0a"/>
  <rect x="158" y="161" width="560" height="16" rx="8" fill="#ffffff0a"/>
  <rect x="158" y="196" width="560" height="16" rx="8" fill="#ffffff0a"/>
  <rect x="158" y="231" width="560" height="16" rx="8" fill="#ffffff0a"/>
  <rect x="158" y="266" width="560" height="16" rx="8" fill="#ffffff0a"/>
  <!-- Bars -->
  <rect x="158" y="56" width="532" height="16" rx="8" fill="url(#cap-bar1)"/>
  <rect x="158" y="91" width="504" height="16" rx="8" fill="url(#cap-bar1)"/>
  <rect x="158" y="126" width="546" height="16" rx="8" fill="url(#cap-bar2)"/>
  <rect x="158" y="161" width="518" height="16" rx="8" fill="url(#cap-bar2)"/>
  <rect x="158" y="196" width="476" height="16" rx="8" fill="url(#cap-bar1)"/>
  <rect x="158" y="231" width="490" height="16" rx="8" fill="url(#cap-bar2)"/>
  <rect x="158" y="266" width="546" height="16" rx="8" fill="url(#cap-bar1)"/>
  <!-- Percentage labels -->
  <text x="698" y="68" font-family="Arial, sans-serif" font-size="11" fill="#5AC8FA" text-anchor="start">95%</text>
  <text x="670" y="103" font-family="Arial, sans-serif" font-size="11" fill="#5AC8FA" text-anchor="start">90%</text>
  <text x="712" y="138" font-family="Arial, sans-serif" font-size="11" fill="#34C759" text-anchor="start">97%</text>
  <text x="684" y="173" font-family="Arial, sans-serif" font-size="11" fill="#34C759" text-anchor="start">92%</text>
  <text x="642" y="208" font-family="Arial, sans-serif" font-size="11" fill="#5AC8FA" text-anchor="start">85%</text>
  <text x="656" y="243" font-family="Arial, sans-serif" font-size="11" fill="#34C759" text-anchor="start">87%</text>
  <text x="712" y="278" font-family="Arial, sans-serif" font-size="11" fill="#5AC8FA" text-anchor="start">97%</text>
  <!-- Legend -->
  <rect x="270" y="302" width="12" height="8" rx="4" fill="url(#cap-bar1)"/>
  <text x="286" y="310" font-family="Arial, sans-serif" font-size="10" fill="#8E8E93">Core</text>
  <rect x="340" y="302" width="12" height="8" rx="4" fill="url(#cap-bar2)"/>
  <text x="356" y="310" font-family="Arial, sans-serif" font-size="10" fill="#8E8E93">Transactional</text>
</svg>

</div>

---

## 🏛️ Architecture

SideQuest is a **client-side Single-Page Application (SPA)** with no build step — just open a browser.

<br/>

<div align="center">

<!-- SVG Architecture Diagram -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 420" width="760" height="420" role="img" aria-label="SideQuest Architecture Diagram">
  <defs>
    <linearGradient id="arch-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0D1333;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#0A0F2C;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="arch-blue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#007AFF;stop-opacity:0.9"/>
      <stop offset="100%" style="stop-color:#0056CC;stop-opacity:0.9"/>
    </linearGradient>
    <linearGradient id="arch-green" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1A3A4C;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#0D2233;stop-opacity:1"/>
    </linearGradient>
  </defs>
  <rect width="760" height="420" fill="url(#arch-bg)" rx="14"/>
  <text x="380" y="30" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">System Architecture</text>
  <!-- Browser Layer label -->
  <rect x="30" y="50" width="700" height="170" rx="10" fill="#ffffff05" stroke="#007AFF" stroke-width="1" stroke-dasharray="6,3"/>
  <text x="50" y="70" font-family="Arial, sans-serif" font-size="11" fill="#5AC8FA" font-weight="600">Browser (SPA — No Build Step)</text>
  <!-- Modules -->
  <rect x="55" y="85" width="110" height="50" rx="8" fill="url(#arch-blue)"/>
  <text x="110" y="107" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">index.html</text>
  <text x="110" y="122" font-family="Arial, sans-serif" font-size="10" fill="#cce4ff" text-anchor="middle">App Shell</text>
  <rect x="185" y="85" width="110" height="50" rx="8" fill="url(#arch-blue)"/>
  <text x="240" y="107" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">app.js</text>
  <text x="240" y="122" font-family="Arial, sans-serif" font-size="10" fill="#cce4ff" text-anchor="middle">Orchestrator</text>
  <rect x="315" y="85" width="110" height="50" rx="8" fill="url(#arch-blue)"/>
  <text x="370" y="107" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">auth.js</text>
  <text x="370" y="122" font-family="Arial, sans-serif" font-size="10" fill="#cce4ff" text-anchor="middle">Authentication</text>
  <rect x="445" y="85" width="110" height="50" rx="8" fill="url(#arch-blue)"/>
  <text x="500" y="107" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">map.js</text>
  <text x="500" y="122" font-family="Arial, sans-serif" font-size="10" fill="#cce4ff" text-anchor="middle">MapLibre GL</text>
  <rect x="575" y="85" width="110" height="50" rx="8" fill="url(#arch-blue)"/>
  <text x="630" y="107" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">tasks.js</text>
  <text x="630" y="122" font-family="Arial, sans-serif" font-size="10" fill="#cce4ff" text-anchor="middle">Task CRUD</text>
  <!-- Arrows down from modules to connector line -->
  <line x1="240" y1="135" x2="240" y2="170" stroke="#007AFF" stroke-width="1.5" stroke-dasharray="4,2"/>
  <line x1="370" y1="135" x2="370" y2="170" stroke="#007AFF" stroke-width="1.5" stroke-dasharray="4,2"/>
  <line x1="500" y1="135" x2="500" y2="170" stroke="#007AFF" stroke-width="1.5" stroke-dasharray="4,2"/>
  <line x1="630" y1="135" x2="630" y2="170" stroke="#007AFF" stroke-width="1.5" stroke-dasharray="4,2"/>
  <line x1="240" y1="170" x2="630" y2="170" stroke="#007AFF" stroke-width="1.5" stroke-dasharray="4,2"/>
  <line x1="435" y1="170" x2="435" y2="195" stroke="#007AFF" stroke-width="2"/>
  <polygon points="430,195 435,205 440,195" fill="#007AFF"/>
  <!-- HTTPS label -->
  <text x="447" y="188" font-family="Arial, sans-serif" font-size="10" fill="#5AC8FA">HTTPS / WSS</text>
  <!-- Firebase Layer -->
  <rect x="30" y="230" width="700" height="160" rx="10" fill="#ffffff05" stroke="#34C759" stroke-width="1" stroke-dasharray="6,3"/>
  <text x="50" y="250" font-family="Arial, sans-serif" font-size="11" fill="#34C759" font-weight="600">Firebase (Google Cloud)</text>
  <rect x="80" y="265" width="180" height="90" rx="8" fill="url(#arch-green)" stroke="#007AFF" stroke-width="1"/>
  <text x="170" y="288" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#5AC8FA" text-anchor="middle">Firebase Auth</text>
  <text x="170" y="308" font-family="Arial, sans-serif" font-size="10" fill="#8E8E93" text-anchor="middle">Email / Password</text>
  <text x="170" y="324" font-family="Arial, sans-serif" font-size="10" fill="#8E8E93" text-anchor="middle">JWT Tokens</text>
  <text x="170" y="340" font-family="Arial, sans-serif" font-size="10" fill="#8E8E93" text-anchor="middle">onAuthStateChanged</text>
  <rect x="300" y="265" width="180" height="90" rx="8" fill="url(#arch-green)" stroke="#34C759" stroke-width="1"/>
  <text x="390" y="288" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#34C759" text-anchor="middle">Cloud Firestore</text>
  <text x="390" y="308" font-family="Arial, sans-serif" font-size="10" fill="#8E8E93" text-anchor="middle">Real-time Listeners</text>
  <text x="390" y="324" font-family="Arial, sans-serif" font-size="10" fill="#8E8E93" text-anchor="middle">/tasks  /users</text>
  <text x="390" y="340" font-family="Arial, sans-serif" font-size="10" fill="#8E8E93" text-anchor="middle">Atomic Transactions</text>
  <rect x="520" y="265" width="180" height="90" rx="8" fill="url(#arch-green)" stroke="#5AC8FA" stroke-width="1"/>
  <text x="610" y="288" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#5AC8FA" text-anchor="middle">MapLibre Tiles</text>
  <text x="610" y="308" font-family="Arial, sans-serif" font-size="10" fill="#8E8E93" text-anchor="middle">OpenStreetMap</text>
  <text x="610" y="324" font-family="Arial, sans-serif" font-size="10" fill="#8E8E93" text-anchor="middle">Vector / Raster</text>
  <text x="610" y="340" font-family="Arial, sans-serif" font-size="10" fill="#8E8E93" text-anchor="middle">Tile Server CDN</text>
  <!-- Bottom label -->
  <text x="380" y="405" font-family="Arial, sans-serif" font-size="10" fill="#555f7a" text-anchor="middle">No custom backend • No server to maintain • No 3am pager alerts (probably)</text>
</svg>

</div>

<br/>

### Data Flow

1. **Auth** — `auth.js` handles sign-in/sign-up; `app.js` reacts via `onAuthStateChanged`.
2. **Map** — `map.js` renders an OpenStreetMap tile layer via MapLibre GL JS and exposes location events.
3. **Tasks** — `tasks.js` subscribes to Firestore in real-time; adds/removes map markers; handles escrow transactions.
4. **UI** — `ui.js` provides a shared `showToast` and `showConfirm` utility used across modules.

<br/>

<div align="center">

<!-- SVG Data Flow Diagram -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 300" width="760" height="300" role="img" aria-label="SideQuest Data Flow Diagram">
  <defs>
    <linearGradient id="df-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0D1333;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#0A0F2C;stop-opacity:1"/>
    </linearGradient>
    <marker id="df-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#007AFF"/>
    </marker>
  </defs>
  <rect width="760" height="300" fill="url(#df-bg)" rx="14"/>
  <text x="380" y="28" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">Task Escrow Data Flow</text>
  <!-- Step boxes -->
  <rect x="30" y="50" width="120" height="48" rx="8" fill="#007AFF" opacity="0.85"/>
  <text x="90" y="71" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">Post Task</text>
  <text x="90" y="87" font-family="Arial, sans-serif" font-size="10" fill="#cce4ff" text-anchor="middle">₹ deducted</text>
  <rect x="185" y="50" width="120" height="48" rx="8" fill="#1A3A4C" stroke="#007AFF" stroke-width="1"/>
  <text x="245" y="71" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#5AC8FA" text-anchor="middle">Escrow Held</text>
  <text x="245" y="87" font-family="Arial, sans-serif" font-size="10" fill="#8E8E93" text-anchor="middle">Firestore txn</text>
  <rect x="340" y="50" width="120" height="48" rx="8" fill="#1A3A4C" stroke="#5AC8FA" stroke-width="1"/>
  <text x="400" y="71" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#5AC8FA" text-anchor="middle">Claimed</text>
  <text x="400" y="87" font-family="Arial, sans-serif" font-size="10" fill="#8E8E93" text-anchor="middle">in-progress</text>
  <rect x="495" y="50" width="120" height="48" rx="8" fill="#1A3A4C" stroke="#34C759" stroke-width="1"/>
  <text x="555" y="71" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#34C759" text-anchor="middle">Completed</text>
  <text x="555" y="87" font-family="Arial, sans-serif" font-size="10" fill="#8E8E93" text-anchor="middle">poster confirms</text>
  <rect x="610" y="50" width="120" height="48" rx="8" fill="#0D3320" stroke="#34C759" stroke-width="1"/>
  <text x="670" y="71" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#34C759" text-anchor="middle">₹ Paid Out</text>
  <text x="670" y="87" font-family="Arial, sans-serif" font-size="10" fill="#8E8E93" text-anchor="middle">assignee wallet</text>
  <!-- Arrows between steps -->
  <line x1="151" y1="74" x2="183" y2="74" stroke="#007AFF" stroke-width="1.5" marker-end="url(#df-arrow)"/>
  <line x1="306" y1="74" x2="338" y2="74" stroke="#007AFF" stroke-width="1.5" marker-end="url(#df-arrow)"/>
  <line x1="461" y1="74" x2="493" y2="74" stroke="#007AFF" stroke-width="1.5" marker-end="url(#df-arrow)"/>
  <line x1="616" y1="74" x2="608" y2="74" stroke="#34C759" stroke-width="1.5" marker-end="url(#df-arrow)"/>
  <!-- Refund path -->
  <text x="380" y="145" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#FF9500" text-anchor="middle">Alternate: Task Deleted Before Claim</text>
  <rect x="185" y="165" width="120" height="48" rx="8" fill="#1A3A4C" stroke="#FF9500" stroke-width="1"/>
  <text x="245" y="186" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#FF9500" text-anchor="middle">Refund</text>
  <text x="245" y="202" font-family="Arial, sans-serif" font-size="10" fill="#8E8E93" text-anchor="middle">₹ returned</text>
  <rect x="340" y="165" width="120" height="48" rx="8" fill="#1A3A4C" stroke="#FF9500" stroke-width="1"/>
  <text x="400" y="186" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#FF9500" text-anchor="middle">Task Deleted</text>
  <text x="400" y="202" font-family="Arial, sans-serif" font-size="10" fill="#8E8E93" text-anchor="middle">Firestore txn</text>
  <line x1="306" y1="189" x2="338" y2="189" stroke="#FF9500" stroke-width="1.5" marker-end="url(#df-arrow)"/>
  <line x1="245" y1="98" x2="245" y2="163" stroke="#FF9500" stroke-width="1" stroke-dasharray="4,3"/>
  <!-- Auto-cleanup note -->
  <rect x="30" y="240" width="700" height="40" rx="8" fill="#ffffff05" stroke="#ffffff10" stroke-width="1"/>
  <text x="380" y="256" font-family="Arial, sans-serif" font-size="11" fill="#8E8E93" text-anchor="middle">⏰  Auto-Cleanup: Tasks older than 24 h are deleted by the client snapshot callback —</text>
  <text x="380" y="272" font-family="Arial, sans-serif" font-size="11" fill="#8E8E93" text-anchor="middle">because nobody wants to claim "pick up my dry cleaning" from 2 weeks ago.</text>
</svg>

</div>

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
├── CONTRIBUTING.md
├── CHANGELOG.md
├── SECURITY.md
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
    ├── Architecture.md
    ├── Installation.md
    ├── Usage.md
    ├── Privacy.md
    ├── Troubleshooting.md
    └── Roadmap.md
```

<br/>

<div align="center">

<!-- SVG Stats Visualization -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 200" width="760" height="200" role="img" aria-label="SideQuest Stats Visualization">
  <defs>
    <linearGradient id="stats-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0D1333;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#0A0F2C;stop-opacity:1"/>
    </linearGradient>
  </defs>
  <rect width="760" height="200" fill="url(#stats-bg)" rx="14"/>
  <text x="380" y="28" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#ffffff" text-anchor="middle">Project At a Glance</text>
  <!-- Stat cards -->
  <rect x="30" y="45" width="155" height="120" rx="10" fill="#ffffff06" stroke="#007AFF" stroke-width="1"/>
  <text x="107" y="88" font-family="Arial, sans-serif" font-size="32" font-weight="800" fill="#007AFF" text-anchor="middle">6</text>
  <text x="107" y="110" font-family="Arial, sans-serif" font-size="11" fill="#8E8E93" text-anchor="middle">JS Modules</text>
  <text x="107" y="128" font-family="Arial, sans-serif" font-size="10" fill="#555f7a" text-anchor="middle">Zero dependencies</text>
  <text x="107" y="148" font-family="Arial, sans-serif" font-size="10" fill="#555f7a" text-anchor="middle">Zero build steps</text>
  <rect x="200" y="45" width="155" height="120" rx="10" fill="#ffffff06" stroke="#34C759" stroke-width="1"/>
  <text x="277" y="88" font-family="Arial, sans-serif" font-size="32" font-weight="800" fill="#34C759" text-anchor="middle">10</text>
  <text x="277" y="110" font-family="Arial, sans-serif" font-size="11" fill="#8E8E93" text-anchor="middle">Core Features</text>
  <text x="277" y="128" font-family="Arial, sans-serif" font-size="10" fill="#555f7a" text-anchor="middle">Map, Wallet, Auth</text>
  <text x="277" y="148" font-family="Arial, sans-serif" font-size="10" fill="#555f7a" text-anchor="middle">Ratings &amp; more</text>
  <rect x="370" y="45" width="155" height="120" rx="10" fill="#ffffff06" stroke="#5AC8FA" stroke-width="1"/>
  <text x="447" y="88" font-family="Arial, sans-serif" font-size="32" font-weight="800" fill="#5AC8FA" text-anchor="middle">₹0</text>
  <text x="447" y="110" font-family="Arial, sans-serif" font-size="11" fill="#8E8E93" text-anchor="middle">Infra Cost (idle)</text>
  <text x="447" y="128" font-family="Arial, sans-serif" font-size="10" fill="#555f7a" text-anchor="middle">Firebase free tier</text>
  <text x="447" y="148" font-family="Arial, sans-serif" font-size="10" fill="#555f7a" text-anchor="middle">Static hosting</text>
  <rect x="540" y="45" width="190" height="120" rx="10" fill="#ffffff06" stroke="#FF9500" stroke-width="1"/>
  <text x="635" y="88" font-family="Arial, sans-serif" font-size="32" font-weight="800" fill="#FF9500" text-anchor="middle">100%</text>
  <text x="635" y="110" font-family="Arial, sans-serif" font-size="11" fill="#8E8E93" text-anchor="middle">Client-Side</text>
  <text x="635" y="128" font-family="Arial, sans-serif" font-size="10" fill="#555f7a" text-anchor="middle">No custom server</text>
  <text x="635" y="148" font-family="Arial, sans-serif" font-size="10" fill="#555f7a" text-anchor="middle">Serverless by design</text>
</svg>

</div>

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
Search bar    → full-text match on title & description
Category chips → filter by Help / Delivery / Social
```

---

## 🔏 Privacy

SideQuest collects only what it needs to function. No ads. No tracking pixels. No "anonymous usage telemetry" that is definitely not anonymous.

| Data | Where It Lives | Who Can See It |
|---|---|---|
| Email address | Firebase Auth | You and Firebase |
| Display name | Firestore `/users` | Other signed-in users |
| Location | Browser memory only | Never written to Firestore |
| Task content | Firestore `/tasks` | All signed-in users |
| Wallet balance | Firestore `/users` | You only (security rules) |
| Ratings | Firestore `/users` | All signed-in users |

> **No cloud analytics. No third-party ad SDKs. No cookies beyond what Firebase Auth requires.**  
> See the [Privacy wiki page](wiki/Privacy.md) for the full breakdown.

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

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide (it's funny, we promise).

---

<div align="center">

## 📄 License

MIT License — do whatever you want. See [LICENSE](LICENSE) for details.

---

*Made with 💻 and ☕ by [Kaelith69](https://github.com/Kaelith69)*

---

> **Why do programmers prefer dark mode?**
> *Because light attracts bugs.* 🐛

</div>

