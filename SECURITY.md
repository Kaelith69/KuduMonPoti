# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| 1.0.x | ✅ Yes |
| < 1.0 | ❌ No |

---

## Reporting a Vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.** Public disclosure before a fix is available puts users at risk.

### How to Report

Send a private report through one of the following channels:

1. **GitHub Private Vulnerability Reporting** (preferred): Use the [Security Advisories](https://github.com/Kaelith69/SideQuest/security/advisories/new) tab in this repository.
2. **Email**: Contact the maintainer directly via the email address listed on their [GitHub profile](https://github.com/Kaelith69).

### What to Include

A useful report contains:

- A description of the vulnerability and its potential impact
- Steps to reproduce (precise, step-by-step)
- The component or file affected (`auth.js`, `firestore.rules`, etc.)
- Any proof-of-concept code or screenshots
- Your suggested fix, if you have one

### Response Timeline

| Stage | Target Time |
|---|---|
| Acknowledgement | Within 48 hours |
| Initial assessment | Within 5 business days |
| Fix deployed | Depends on severity (critical: ASAP; low: next release) |
| Public disclosure | After fix is verified and deployed |

We will keep you updated throughout the process. If you do not hear back within 48 hours, please follow up — inboxes are fallible.

---

## Scope

The following are **in scope** for security reports:

- Authentication bypass or privilege escalation
- Firestore security rule bypasses (reading/writing other users' data)
- Wallet balance manipulation (escrow race conditions, double-spend)
- Cross-site scripting (XSS) via task content
- Sensitive data exposure (credentials, PII)
- Denial-of-service attacks that affect availability for legitimate users

The following are **out of scope**:

- Issues in third-party services (Firebase, MapLibre) — please report those upstream
- Rate limiting (not yet implemented — noted as a known gap)
- Missing `Content-Security-Policy` headers (hosting-layer configuration)
- Self-XSS or attacks that require the victim to be authenticated as the attacker
- Social engineering or phishing attacks
- Bugs that do not have a security impact

---

## Known Security Limitations

We believe in transparency. The following limitations exist in the current version:

| Limitation | Notes |
|---|---|
| Firestore rules | Development-mode rules expire 2026-03-01. Production deployments must replace them with the rules documented in the [Security Guide](wiki/Security-Guide.md). |
| No server-side rate limiting | Client-side only. A determined attacker could spam Firestore writes. |
| No email verification | Users can sign up with any email. Phone/email verification is on the roadmap. |
| Client-side auto-cleanup | Task expiry runs on the client; a client that never opens the app will not trigger cleanup for its own stale tasks. |

---

## Responsible Disclosure Policy

We follow a **coordinated disclosure** model:

1. You report privately.
2. We confirm, assess, and fix.
3. We credit you in the release notes (unless you prefer anonymity).
4. We publish a security advisory after the fix is live.

We will not take legal action against researchers who act in good faith and follow this policy. We will, however, quietly judge you if you submit "I found an XSS by injecting `<script>alert(1)</script>` into a field that is already sanitised."

---

## Hall of Fame

Researchers who have responsibly disclosed vulnerabilities will be listed here with their permission.

*(No entries yet. Be the first. It looks great on a CV.)*

---

*Thank you for helping keep SideQuest and its users safe.* 🔒
