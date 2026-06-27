# archit.sharma — portfolio

Personal portfolio site for Archit Sharma, AI/ML engineer. Built with Vite + React + Tailwind CSS.

The signature feature is an interactive causal DAG in the hero section: hovering a node highlights its downstream path, mirroring the do-operator — intervene on a node and watch what it touches.

## Local development

```bash
npm install
npm run dev        # starts at http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

## Deploy to Vercel (free)

1. Push this repo to GitHub (commands below).
2. Go to [vercel.com](https://vercel.com) → **Add New → Project**.
3. Import the GitHub repo. Vercel auto-detects Vite.
4. Build command: `npm run build` (auto-filled).
5. Output directory: `dist` (auto-filled).
6. Click **Deploy**. Done — you get a `*.vercel.app` URL instantly.
7. Add a custom domain later via **Project → Settings → Domains**.

No `vercel.json` needed — Vite's defaults work out of the box.

## Push to GitHub

```bash
git init
git add .
git commit -m "initial commit: portfolio site"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

Replace `YOUR_GITHUB_REPO_URL` with your actual repo URL (e.g. `https://github.com/yourusername/portfolio.git`).

---

## Placeholder checklist

| What | File | Notes |
|---|---|---|
| GitHub profile URL | `src/components/Hero.jsx:7`, `src/components/Footer.jsx:7` | Replace `YOUR_GITHUB_URL` |
| LinkedIn URL | `src/components/Hero.jsx:8`, `src/components/Footer.jsx:8` | Replace `YOUR_LINKEDIN_URL` |
| Email address | `src/components/Hero.jsx:9`, `src/components/Footer.jsx:9` + footer display | Replace `YOUR_EMAIL` (appears twice in Footer) |
| Threadfall GitHub repo | `src/components/Work.jsx` — `github` field, project 0 | Replace `YOUR_THREADFALL_GITHUB_URL` |
| Causeway GitHub repo | `src/components/Work.jsx` — `github` field, project 1 | Replace `YOUR_CAUSEWAY_GITHUB_URL` |
| Threadfall demo URL | `src/components/Work.jsx` — `demo` field, project 0 | Replace `YOUR_THREADFALL_DEMO_URL` |
| CV PDF | `public/cv.pdf` | Drop your actual PDF here; the CV button is already wired |
