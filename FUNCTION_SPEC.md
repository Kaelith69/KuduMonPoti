# TaskPop Function Specification

This document lists all the functions required for the TaskPop application, categorized by module. It serves as a checklist for implementation.

## 1. Authentication (`js/auth.js`)

| Function Name | Description | Status |
| :--- | :--- | :--- |
| `initializeAuth()` | Sets up auth state listeners and toggles. | [x] Implemented |
| `handleLogin(email, password)` | Authenticates user with Firebase Auth. | [x] Implemented |
| `handleSignup(name, email, password)` | Creates new user and updates profile. | [x] Implemented |
| `logout()` | Signs out the current user. | [x] Implemented |
| `showError(message)` | Displays authentication errors to the user. | [x] Implemented |

## 2. Map Logic (`js/map.js`)

| Function Name | Description | Status |
| :--- | :--- | :--- |
| `initMap(user)` | Initializes MapLibre GL map, centers on user/default. | [x] Implemented |
| `addUserMarker(lng, lat)` | Adds the user's current location marker. | [x] Implemented |
| `updateUserMarker(lng, lat)` | Updates the user's location marker on move. | [x] Implemented |
| `addMarker(task, onClick)` | Adds a custom marker for a task on the map. | [x] Implemented |
| `getMapCenter()` | Returns current map center coordinates. | [x] Implemented |
| `clearMarkers()` | Removes all task markers from the map (for refreshing). | [ ] Pending |
| `calculateDistance(coord1, coord2)` | Calculates distance between two points (Haversine). | [ ] Pending |

## 3. Task Management (`js/tasks.js`)

| Function Name | Description | Status |
| :--- | :--- | :--- |
| `initTaskListeners()` | Sets up UI event listeners for FAB and Modals. | [x] Implemented |
| `openCreateModal()` | Opens the task creation modal with animation. | [x] Implemented |
| `closeModals()` | Closes and resets all modals. | [x] Implemented |
| `createTask(data)` | Validates and saves a new task to Firestore. | [x] Implemented |
| `listenForTasks()` | Real-time listener for tasks collection. | [x] Implemented |
| `handleSnapshot(snapshot)` | Processes real-time updates and manages markers. | [x] Implemented (Partial - needs clear/update logic) |
| `openTaskDetail(task)` | Populates and opens the task detail modal. | [x] Implemented (Partial - needs formatting) |
| `claimTask(taskId, userId)` | Updates task status to 'in-progress' assigned to user. | [ ] Pending |
| `deleteTask(taskId)` | Deletes a task (only if user is owner). | [ ] Pending |
| `completeTask(taskId)` | Marks task as completed. | [ ] Pending |

## 4. Utilities / Helpers (New Module or Inline)

| Function Name | Description | Status |
| :--- | :--- | :--- |
| `formatRelativeTime(timestamp)` | Converts timestamp to "2 mins ago", etc. | [ ] Pending |
| `formatCurrency(amount)` | Formats number to currency string. | [x] Basic Implementation |
| `validateTaskInput(data)` | Validates form data before submission. | [ ] Pending |

## 5. App Orchestration (`js/app.js`)

| Function Name | Description | Status |
| :--- | :--- | :--- |
| `init()` | Main entry point, initializes components. | [x] Implemented |
| `showAuth()` | Switches view to authentication screen. | [x] Implemented |
| `showApp(user)` | Switches view to main app screen. | [x] Implemented |
| `updateUserAvatar(user)` | Updates UI with user profile info. | [x] Implemented |
