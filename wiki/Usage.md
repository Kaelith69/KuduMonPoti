# Usage Guide

Everything you need to know to post, claim, complete, and rate tasks on SideQuest. If you can use a food delivery app, you can use SideQuest. The map does not lie (usually).

---

## Getting Around

After signing in you will see:

| UI Element | What It Does |
|---|---|
| **Map** | Full-screen OpenStreetMap; shows task pins within ~0.5 km of you |
| **＋ FAB** | Floating action button — tap to post a new task |
| **Task list panel** | Slides up from the bottom; lists nearby tasks |
| **Category chips** | Filter tasks by Help, Delivery, Social, Other |
| **Search bar** | Full-text search across task titles and descriptions |
| **Profile icon** | Top-right corner; opens your profile and wallet |

---

## Posting a Task

1. Tap the **＋** button (bottom-right of the map)
2. Fill in the form:
   - **Title** — short and descriptive ("Walk my dog — 30 min")
   - **Category** — Help / Delivery / Social / Other
   - **Description** — optional details
   - **Reward (₹)** — optional; must be ≤ your current wallet balance
3. Tap **Post Task**

The reward amount is **immediately escrowed** from your wallet via an atomic Firestore transaction. Your wallet balance decreases at the moment of posting, not at completion.

> If you change your mind, delete the task before it is claimed — your ₹ will be refunded automatically.

---

## Finding & Claiming a Task

1. Look for **coloured pins** on the map (or browse the task list panel)
2. Tap a pin to see task details
3. Review the title, description, category, and reward
4. Tap **I'll do it!** to claim the task

Once claimed:
- The task status changes to `in-progress`
- The pin changes colour on the map
- The task moves to your "Claimed" tab
- No one else can claim it

> You cannot claim your own tasks. The app will tell you off if you try.

---

## Completing a Task

1. Do the actual work (the non-software part)
2. Open the task from your **Claimed** tab
3. Tap **Mark as Done**
4. Wait for the task poster to confirm

The task enters `pending-confirmation` state. The poster will receive a notification to confirm and rate you.

---

## Confirming & Rating

As the **task poster**:

1. You will see the task in your **Posted** tab with a "Confirm completion" prompt
2. Select a **star rating** (1–5) for the work done
3. Tap **Confirm & Pay**

The reward is released to the assignee's wallet via an atomic Firestore transaction. Their rating average is updated automatically.

---

## Deleting a Task

You can delete a task you posted **only if it has not been claimed yet**.

1. Open the task detail from the map pin or your Posted tab
2. Tap **Delete Task**
3. Confirm the deletion

Your escrowed reward is refunded immediately.

---

## Wallet

Your wallet stores your current ₹ balance. New accounts start with ₹500 (demo credits — fictional, not withdrawable).

| Action | Effect on Wallet |
|---|---|
| Post a task with reward | −₹ (escrowed) |
| Delete your unclaimed task | +₹ (refunded) |
| Complete a task for someone | +₹ (paid out) |

To view your balance: tap your **profile icon** → wallet balance is shown at the top.

---

## Profile

Your profile shows:
- Display name (editable)
- Wallet balance
- Tasks posted count
- Tasks completed count
- Average star rating

To edit your display name: tap the **pencil icon** next to your name in the profile screen.

---

## Search & Filter

**Search**: Type in the search bar at the top of the task list. SideQuest does a client-side full-text match on task title and description.

**Filter**: Tap a category chip (Help, Delivery, Social, Other) to show only tasks in that category. Tap again to deselect.

Both filters can be combined: category chip + search text = narrowed results.

---

## Tips & Tricks

- **Location accuracy**: SideQuest uses your browser's Geolocation API. For best results, allow precise location (not "approximate") in your browser settings.
- **Task radius**: Only tasks within approximately 0.5 km of your current location appear on the map. Move the map to see tasks in other areas.
- **Stale tasks**: Tasks that are older than 24 hours and still `open` are automatically deleted. This keeps the map fresh.
- **Offline behaviour**: SideQuest requires an internet connection. It does not cache tasks for offline use (yet — see [Roadmap](Roadmap.md)).

---

[← Installation](Installation.md) | [Architecture →](Architecture.md) | [Privacy →](Privacy.md)
