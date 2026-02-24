# Changelog

All notable changes to SideQuest are documented here.

Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning loosely follows [Semantic Versioning](https://semver.org/) — we say "loosely" because this is a side project and we reserve the right to be chaotic.

---

## [1.0.0] — 2026-02-24

### 🎉 Initial Release — "It Compiles On My Machine"

The first public version. It has a map. It has tasks. It has a wallet. The bugs are features pending documentation.

### Added

- **Firebase Authentication** — sign up, sign in, sign out. Passwords are hashed by Firebase. We never see them. We do not want to see them.
- **Interactive map** via MapLibre GL JS with OpenStreetMap tiles. Your neighbourhood, rendered in glorious vector.
- **Geolocation** — the app asks where you are and believes you (mostly).
- **Task creation** — title, category, description, optional ₹ reward. The `+` FAB button is extremely satisfying to tap.
- **Escrow wallet** — reward is atomically deducted on post, atomically refunded on delete, atomically paid out on completion. Three atomic transactions. Very nuclear. Very safe.
- **Task claiming** — one neighbour, one task, no race conditions (in theory).
- **Task completion & ratings** — 1–5 stars. Finally, a place to channel your feelings about your neighbour's dog.
- **Real-time Firestore listeners** — tasks appear and disappear on the map in real time. Like magic, but it's websockets.
- **Category filter** — Help, Delivery, Social. "Other" exists for chaos.
- **Full-text search** — searches title and description. Not quite Elasticsearch. Definitely quicker to set up.
- **User profiles** — display name, wallet balance, tasks posted/completed, average rating.
- **Auto-cleanup** — tasks older than 24 hours are automatically deleted. Unlike your browser tabs.
- **Mobile-first UI** — safe-area insets, `svh` viewport units, bottom-sheet modals. Looks good on a phone. Looks fine on a desktop.
- **Toast notifications** — non-blocking, non-annoying, non-modal. The good kind.
- **`firestore.rules`** — security rules that actually gate writes by auth state. Groundbreaking.
- **Complete documentation suite** — README, CONTRIBUTING, CHANGELOG, SECURITY, and full wiki.

### Known Quirks (Not Bugs, Definitely Features)

- Map marker clustering: when 50 tasks appear in the same block, it looks like a blue confetti explosion. This is a future problem.
- Wallet balance updates: may take one real-time listener tick to reflect. This is called "optimism."
- The ₹500 demo wallet is fictional. You cannot withdraw it. We are not a bank.

---

## [Unreleased]

Features cooking in the backlog. No ETA. No promises. Just vibes.

### Planned

- Push notifications for task status changes
- Image attachments on tasks
- In-app chat between poster and assignee
- Real payment gateway (Razorpay / Stripe)
- PWA offline support
- Marker clustering for dense areas
- Phone number verification
- Advanced search with distance and price filters

---

*"Fixed bug where reality stopped working." — every changelog ever*
