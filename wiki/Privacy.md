# Privacy

SideQuest collects only what is strictly necessary to function as a task marketplace. No ads. No tracking pixels. No "anonymous analytics" that somehow know your shoe size.

---

## Principle

> Collect the minimum. Store the minimum. Never sell anything.

SideQuest is a personal open-source project. It has no business model based on user data. It has no investors demanding engagement metrics. It is a neighbourhood tool.

---

## Data Collected

### What We Collect and Where It Lives

| Data | Stored In | Visible To | Why It's Needed |
|---|---|---|---|
| Email address | Firebase Auth | You and Firebase | Account identity and login |
| Display name | Firestore `/users/{uid}` | Other signed-in users | Show who posted / claimed a task |
| Wallet balance | Firestore `/users/{uid}` | You only (rules-enforced) | Escrow and payment tracking |
| Tasks posted/completed count | Firestore `/users/{uid}` | All signed-in users | Profile stats |
| Average rating | Firestore `/users/{uid}` | All signed-in users | Trust and reputation |
| Task content (title, description, category, reward) | Firestore `/tasks` | All signed-in users | Task discovery |
| Task location (lat/lng) | Firestore `/tasks` | All signed-in users | Map pin placement |
| Device location | Browser memory only | **Never written to Firestore** | Centring the map on you |

### What We Do NOT Collect

- Precise location history — your `watchPosition` coordinates are used only to centre the map and are never persisted
- IP addresses — Firebase may log these for security; SideQuest does not use them
- Device identifiers, fingerprints, or hardware info
- Browsing history or behaviour outside of SideQuest
- Payment card data (wallets are fictional demo credits in this version)

---

## Third-Party Services

SideQuest uses two external services. No others.

### Firebase (Google)

Firebase Auth and Cloud Firestore are provided by Google. By using SideQuest, your authentication data and task data are stored on Google's infrastructure.

- Firebase Privacy: [firebase.google.com/support/privacy](https://firebase.google.com/support/privacy)
- Google Privacy Policy: [policies.google.com/privacy](https://policies.google.com/privacy)

### MapLibre / OpenStreetMap Tiles

The map tile images are served from the MapLibre demo tile server (OpenStreetMap data). Your browser makes HTTP requests to this CDN when you pan or zoom the map. No user data is sent — only the tile coordinates (x/y/z) are included in the request.

- OpenStreetMap Privacy: [wiki.openstreetmap.org/wiki/Privacy_Policy](https://wiki.openstreetmap.org/wiki/Privacy_Policy)

---

## No Analytics, No Ads

SideQuest includes **no analytics SDKs** (no Google Analytics, no Mixpanel, no Amplitude). It includes **no advertising SDKs**. It includes **no social media tracking pixels**.

If you want to verify this, inspect the network requests in your browser's DevTools. You will see requests to:
- `firebaseapp.com` / `googleapis.com` (Auth + Firestore)
- `demotiles.maplibre.org` (map tiles)
- `cdn.tailwindcss.com` (CSS framework)
- `unpkg.com` (MapLibre JS)

Nothing else.

---

## Data Retention

| Data | Retention |
|---|---|
| Tasks (open, >24 h old) | Auto-deleted by client on snapshot |
| Tasks (completed) | Retained until manually deleted (future: auto-archive) |
| User accounts | Retained until account deletion (manual via Firebase Console) |
| Auth tokens | Managed by Firebase; expire per Firebase defaults |

There is currently no self-service account deletion flow in the UI. To delete your account and data, contact the maintainer via a [GitHub issue](https://github.com/Kaelith69/SideQuest/issues) or delete your Firebase Auth account directly from the Firebase Console if you have access.

---

## Security of Your Data

Firestore security rules enforce:

- Only authenticated users can read the `/tasks` collection
- Only you can read your own wallet balance
- Only you can update your own `/users` document
- Wallet mutations use atomic transactions to prevent manipulation

See [Security Guide](Security-Guide.md) for the full rule set.

---

## Changes to This Policy

If this policy changes materially, a note will be added to [CHANGELOG.md](https://github.com/Kaelith69/SideQuest/blob/main/CHANGELOG.md) and the wiki will be updated. We will not send you a 40-page email with "We've updated our privacy policy" in the subject line.

---

## Contact

Questions about privacy? Open a [GitHub issue](https://github.com/Kaelith69/SideQuest/issues) with the label `privacy`.

---

[← Usage](Usage.md) | [Security Guide →](Security-Guide.md) | [Home →](Home.md)
