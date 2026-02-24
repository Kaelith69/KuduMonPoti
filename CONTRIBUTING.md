# Contributing to SideQuest 🎮

First off: thank you. You are voluntarily spending your finite time on Earth improving a neighbourhood task marketplace. That is objectively noble.

> *"Found a bug? Congratulations — you are now part of the development team."*

---

## 🚀 Quick Start for Contributors

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/SideQuest.git
cd SideQuest
```

No `npm install`. No `yarn`. No `pnpm`. No package manager tears. Just files. 🧘

### 2. Set Up Firebase

Follow the [Installation Guide](wiki/Installation.md) to wire up your own Firebase project. You do not need to touch production credentials. Ever.

### 3. Open in a Browser

```bash
python -m http.server 8000
# or
npx http-server . -p 8000
```

Navigate to `http://localhost:8000`. You're live.

---

## 🌿 Branch Naming

| Prefix | When to Use | Example |
|---|---|---|
| `feat/` | New feature | `feat/push-notifications` |
| `fix/` | Bug fix | `fix/marker-not-clearing` |
| `docs/` | Documentation only | `docs/update-wiki` |
| `refactor/` | Code cleanup, no behaviour change | `refactor/extract-haversine` |
| `chore/` | Dependency bumps, config | `chore/update-firebase-sdk` |

---

## ✍️ Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/). Your future self will thank you (and so will `git log`).

```
feat: add image attachments to task creation
fix: prevent double-claim race condition
docs: clarify escrow model in wiki
refactor: extract distance utils to helpers.js
```

---

## 📐 Code Style

There is no linter (yet — feel free to add one in a PR). Until then:

- **ES Modules** — `import`/`export`, no CommonJS `require()`
- **Async/Await** — no raw `.then().catch()` chains unless unavoidable
- **No `var`** — `const` by default, `let` when you must
- **Descriptive names** — `taskId` not `id`, `userWalletBalance` not `bal`
- **Comments** — only when the *why* isn't obvious from the code
- **No inline `style=""` attributes** — use Tailwind classes or `main.css`

---

## 🧪 Testing

SideQuest currently relies on manual testing (a.k.a. *the most humbling form of QA*). Before submitting a PR, please check:

- [ ] Sign up → sign in → sign out flow works
- [ ] Task creation with and without a ₹ reward
- [ ] Task claiming and completion (wallet balances update correctly)
- [ ] Task deletion refunds the escrow amount
- [ ] Map markers appear, update, and disappear in real time
- [ ] Filter by category works
- [ ] Search works
- [ ] Mobile layout looks correct on a 375 px viewport

If you add new functionality, describe how you tested it in the PR description.

---

## 🔀 Pull Request Process

1. **Keep PRs focused.** One feature or fix per PR. Giant PRs will be reviewed with the same enthusiasm as a 3000-line diff on a Friday afternoon.
2. **Write a clear description.** What does this change? Why? How did you test it?
3. **Reference issues.** If your PR closes an issue, add `Closes #42` in the description.
4. **Be patient.** This is a side project. Reviews may take a few days.

---

## 🐛 Reporting Bugs

Please use [GitHub Issues](https://github.com/Kaelith69/SideQuest/issues/new) and include:

- **What you expected** to happen
- **What actually happened** (the audacity)
- **Steps to reproduce** — precise enough that a stranger could follow them
- **Browser & OS** — "latest Chrome on macOS" is fine
- **Console errors** — open DevTools, copy the red stuff

> *No, "it's broken" is not a sufficient bug report. Yes, this has been tried.*

---

## 💡 Suggesting Features

Open a [GitHub Issue](https://github.com/Kaelith69/SideQuest/issues/new) with the `enhancement` label. Describe:

- The problem you're trying to solve
- Your proposed solution
- Any alternatives you considered
- Why you think this belongs in SideQuest vs. a separate project

---

## 🔒 Security Vulnerabilities

Please **do not** open a public issue for security vulnerabilities. See [SECURITY.md](SECURITY.md) for responsible disclosure instructions.

---

## 📜 Code of Conduct

Be kind. Be constructive. Assume good intent. Don't be the person who writes "this is trivially obvious" in a code review.

If someone is being a jerk, open an issue or email the maintainer.

---

## 🎉 Recognition

All contributors are listed in the [GitHub contributors graph](https://github.com/Kaelith69/SideQuest/graphs/contributors). It is not much, but it is honest work.

---

*Thanks for contributing. The neighbourhood thanks you. Go touch some grass (after you merge your PR).* 🌱
