# Troubleshooting Guide

Common issues and their solutions for SideQuest.

## 🎯 Quick Diagnostic

Before diving into specific issues, try these general troubleshooting steps:

1. **Hard refresh**: Ctrl+F5 (Windows) / Cmd+Shift+R (Mac)
2. **Clear cache**: Clear browser cache and cookies
3. **Check console**: Open browser DevTools (F12) and check Console tab for errors
4. **Try incognito**: Test in incognito/private browsing mode
5. **Different browser**: Try Chrome, Firefox, or Safari

---

## 🚫 Installation Issues

### Issue: Can't clone repository

**Symptoms:**
```bash
fatal: repository 'https://github.com/Kaelith69/SideQuest.git' not found
```

**Solutions:**
1. Check the repository URL is correct
2. Verify you have internet connection
3. Try using SSH instead of HTTPS:
   ```bash
   git clone git@github.com:Kaelith69/SideQuest.git
   ```

### Issue: Firebase config file missing

**Symptoms:**
- Error: `Cannot find module './firebase-config.js'`
- App crashes on load

**Solutions:**
1. Create `js/firebase-config.js`:
   ```bash
   touch js/firebase-config.js
   ```
2. Add your Firebase configuration (see [Installation Guide](Installation-Guide.md))
3. Verify the file is in the correct location: `/js/firebase-config.js`

### Issue: Local server won't start

**Symptoms:**
- `python: command not found`
- `npm: command not found`

**Solutions:**

For Python:
```bash
# Check if Python is installed
python --version
python3 --version

# Install Python from python.org if needed
```

For Node.js:
```bash
# Check if Node is installed
node --version

# Install Node.js from nodejs.org if needed
```

Alternative: Use VS Code Live Server extension

### Issue: CORS errors when opening index.html

**Symptoms:**
```
Access to script at 'file:///js/app.js' from origin 'null' has been blocked by CORS policy
```

**Solution:**
You **cannot** open `index.html` directly. You must use a local web server:
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server . -p 8000
```

---

## 🔐 Authentication Issues

### Issue: Can't sign up

**Symptoms:**
- Error: "Email already in use"
- Error: "Invalid email"
- Error: "Weak password"

**Solutions:**

**Email already in use:**
- Try signing in instead of signing up
- Use a different email address
- Reset password (if implemented)

**Invalid email:**
- Check email format is valid (e.g., `user@example.com`)
- Remove spaces or special characters

**Weak password:**
- Password must be at least 6 characters
- Use a mix of letters, numbers, and symbols

### Issue: Can't sign in

**Symptoms:**
- Error: "Wrong password"
- Error: "User not found"
- Stuck on loading screen

**Solutions:**

1. **Verify credentials**:
   - Check email spelling
   - Check password (case-sensitive)
   - Try resetting password

2. **Check Firebase Console**:
   - Go to Firebase Console → Authentication
   - Verify Email/Password auth is enabled
   - Check if user exists in the list

3. **Check browser console**:
   - Open DevTools (F12)
   - Look for specific error messages
   - Common errors:
     ```
     auth/user-not-found
     auth/wrong-password
     auth/too-many-requests
     auth/network-request-failed
     ```

### Issue: Automatically logged out

**Symptoms:**
- Session expires unexpectedly
- Have to log in every time

**Solutions:**

1. **Check session persistence**:
   ```javascript
   // In firebase-config.js or auth.js
   import { setPersistence, browserLocalPersistence } from "firebase/auth";
   await setPersistence(auth, browserLocalPersistence);
   ```

2. **Check browser settings**:
   - Allow cookies for the site
   - Don't block third-party cookies
   - Disable "Clear cookies on exit"

3. **Check Firebase token expiration**:
   - Firebase tokens expire after 1 hour
   - Refresh is automatic if configured correctly

---

## 🗺️ Map Issues

### Issue: Map not loading

**Symptoms:**
- Blank gray area where map should be
- Error: "Style is not done loading"
- Map tiles not appearing

**Solutions:**

1. **Check internet connection**:
   - Map tiles load from CDN
   - Verify you can access `https://demotiles.maplibre.org`

2. **Check MapLibre loading**:
   ```javascript
   // In browser console
   console.log(maplibregl);  // Should not be undefined
   ```

3. **Check for JavaScript errors**:
   - Open Console (F12)
   - Look for MapLibre-related errors

4. **Try different map style**:
   ```javascript
   // In map.js, change style URL
   style: 'https://demotiles.maplibre.org/style.json'
   ```

### Issue: User location not working

**Symptoms:**
- "Location access denied" message
- Map doesn't center on user
- User marker doesn't appear

**Solutions:**

1. **Grant location permissions**:
   - Click the location icon in browser address bar
   - Allow location access for the site
   - Refresh the page

2. **Check browser location settings**:
   - Settings → Privacy → Location
   - Ensure location services are enabled

3. **HTTPS requirement**:
   - Geolocation requires HTTPS (or localhost)
   - If testing on local network, use `localhost` not IP address

4. **Test geolocation manually**:
   ```javascript
   // In browser console
   navigator.geolocation.getCurrentPosition(
     pos => console.log(pos),
     err => console.error(err)
   );
   ```

### Issue: Markers not appearing

**Symptoms:**
- Map loads but no task markers
- Only user marker visible
- Tasks exist in Firestore but don't show

**Solutions:**

1. **Check if tasks exist**:
   - Open Firebase Console → Firestore
   - Check `tasks` collection
   - Verify status is "open"

2. **Check real-time listener**:
   ```javascript
   // In browser console
   // You should see snapshot updates logged
   ```

3. **Check marker creation**:
   ```javascript
   // In map.js
   console.log('Adding marker for task:', task.id);
   ```

4. **Check map bounds**:
   - Zoom out to see if markers are outside view
   - Pan around the map

### Issue: Map performance is slow

**Symptoms:**
- Laggy map movement
- Slow marker rendering
- Browser becomes unresponsive

**Solutions:**

1. **Limit number of markers**:
   ```javascript
   // Add limit to query
   const q = query(
     collection(db, "tasks"),
     where("status", "==", "open"),
     limit(50)  // Add this
   );
   ```

2. **Clear old markers**:
   ```javascript
   // Make sure clearMarkers() is called before adding new ones
   clearMarkers();
   ```

3. **Reduce map complexity**:
   - Lower zoom level
   - Disable 3D buildings
   - Use simpler map style

4. **Check device performance**:
   - Close other tabs/apps
   - Update browser
   - Check CPU/memory usage

---

## 💰 Task & Wallet Issues

### Issue: Can't create task

**Symptoms:**
- "Insufficient balance" error
- Form validation errors
- Task not appearing after creation

**Solutions:**

**Insufficient balance:**
1. Check your wallet balance
2. Reduce reward amount or set to 0
3. Add funds to wallet (see FAQ)

**Validation errors:**
- Title: 3-100 characters required
- Description: 10-1000 characters required
- Reward: Must be positive number
- Category: Must select one

**Task not appearing:**
1. Check Firestore Console for task creation
2. Check browser console for errors
3. Verify real-time listener is active
4. Refresh the page

### Issue: Can't claim task

**Symptoms:**
- "Cannot claim own task" error
- Claim button not working
- Task disappears after claiming

**Solutions:**

**Can't claim own task:**
- You posted this task, find another one to claim

**Button not working:**
1. Check if you're signed in
2. Check if task is still "open"
3. Check browser console for errors

**Task disappears:**
- This is expected - check "My Tasks" → "Claimed" tab

### Issue: Wallet balance incorrect

**Symptoms:**
- Balance doesn't update
- Negative balance
- Balance resets to 0

**Solutions:**

1. **Check Firestore**:
   - Open Firebase Console → Firestore
   - Go to `users/{your-uid}`
   - Check `wallet` field value

2. **Check for transaction errors**:
   - Look in browser console
   - Check for failed transaction messages

3. **Manual correction** (if needed):
   - Go to Firebase Console
   - Edit user document
   - Update `wallet` field

4. **Implement transactions properly**:
   - Always use Firestore transactions
   - Never update wallet with plain `updateDoc()`

### Issue: Task stuck "in-progress"

**Symptoms:**
- Can't complete task
- Can't cancel claim
- Task never completes

**Solutions:**

1. **Check task status in Firestore**:
   - Verify status is "in-progress"
   - Verify claimedBy matches your UID

2. **Complete task manually**:
   ```javascript
   // In browser console (admin only)
   await updateDoc(doc(db, 'tasks', 'TASK_ID'), {
     status: 'completed',
     completedAt: serverTimestamp()
   });
   ```

3. **Delete and recreate** (if poster):
   - Delete the stuck task
   - Create a new one

---

## 🔒 Firestore Permission Errors

### Issue: "Missing or insufficient permissions"

**Symptoms:**
```
FirebaseError: Missing or insufficient permissions
```

**Solutions:**

1. **Check if signed in**:
   ```javascript
   // In browser console
   console.log(auth.currentUser);  // Should not be null
   ```

2. **Check security rules**:
   - Go to Firebase Console → Firestore → Rules
   - Verify rules allow your operation
   - See [Security Guide](Security-Guide.md)

3. **Test with open rules** (development only):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;  // TESTING ONLY!
       }
     }
   }
   ```
   ⚠️ **Never use in production!**

4. **Check rule expiration**:
   - Current rules may have expired
   - Update timestamp in rules

### Issue: "Document not found"

**Symptoms:**
```
FirebaseError: [code=not-found]: Document not found
```

**Solutions:**

1. **Verify document exists**:
   - Check Firebase Console → Firestore
   - Search for document ID

2. **Check document path**:
   ```javascript
   // Correct
   doc(db, "tasks", taskId)
   
   // Wrong
   doc(db, "task", taskId)  // Missing 's'
   ```

3. **Check for deleted documents**:
   - Document may have been deleted
   - Check auto-deletion (24h rule)

---

## 🌐 Network & Firebase Issues

### Issue: "Network request failed"

**Symptoms:**
```
FirebaseError: [code=unavailable]: Network request failed
```

**Solutions:**

1. **Check internet connection**:
   - Verify you're online
   - Try loading other websites

2. **Check Firebase status**:
   - Visit [Firebase Status](https://status.firebase.google.com/)
   - Check for outages

3. **Check firewall/antivirus**:
   - May be blocking Firebase
   - Try disabling temporarily

4. **Check CORS settings**:
   - If using custom domain
   - Verify CORS configuration

### Issue: "Quota exceeded"

**Symptoms:**
```
FirebaseError: [code=resource-exhausted]: Quota exceeded
```

**Solutions:**

1. **Check Firebase usage**:
   - Firebase Console → Usage
   - You may have exceeded free tier limits:
     - Reads: 50k/day
     - Writes: 20k/day
     - Deletes: 20k/day

2. **Optimize queries**:
   - Add `.limit()` to queries
   - Reduce listener updates
   - Implement pagination

3. **Upgrade plan** (if needed):
   - Switch to Blaze (pay-as-you-go) plan
   - Set budget alerts

---

## 🖥️ Browser-Specific Issues

### Chrome

**Issue**: Service Worker errors
**Solution**: Clear Application data (DevTools → Application → Clear storage)

**Issue**: Camera/location always denied
**Solution**: Settings → Privacy → Site Settings → Reset permissions

### Firefox

**Issue**: ES modules not loading
**Solution**: Ensure `type="module"` in script tags

**Issue**: IndexedDB quota errors
**Solution**: Settings → Privacy → Clear Data → Cookies and Site Data

### Safari

**Issue**: Map tiles not loading
**Solution**: Safari → Preferences → Privacy → Disable "Prevent cross-site tracking"

**Issue**: Geolocation not working
**Solution**: Safari → Preferences → Websites → Location → Allow

### Mobile Browsers

**Issue**: Bottom navigation covered by device nav bar
**Solution**: Add safe area insets (already implemented in CSS)

**Issue**: Map gestures conflict with page scroll
**Solution**: Use two-finger gestures on map

---

## 🔍 Debugging Tools

### Browser Console

Open DevTools (F12) and check:

1. **Console Tab**: JavaScript errors and logs
2. **Network Tab**: API calls and responses
3. **Application Tab**: Cookies, Local Storage, IndexedDB

### Firebase Emulator

For local testing:

```bash
firebase emulators:start
```

Benefits:
- Test without affecting production data
- No cost for operations
- Faster development cycle

### Firestore Console

Check data directly:
- Firebase Console → Firestore Database
- View collections and documents
- Manually edit data
- Check indexes

---

## 📞 Getting More Help

If your issue isn't listed here:

1. **Search existing issues**: [GitHub Issues](https://github.com/Kaelith69/SideQuest/issues)
2. **Check the FAQ**: [FAQ](FAQ.md)
3. **Open a new issue**: Include:
   - Clear description of problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and device info
   - Console error messages (if any)
   - Screenshots (if relevant)

---

## 🛠️ Preventive Measures

Avoid issues by following best practices:

- ✅ Always test in development first
- ✅ Keep Firebase dependencies updated
- ✅ Use proper security rules
- ✅ Implement error handling
- ✅ Test on multiple browsers
- ✅ Monitor Firebase usage
- ✅ Keep backups of data
- ✅ Document custom changes

---

[← Back to Home](Home.md) | [Next: FAQ →](FAQ.md)
