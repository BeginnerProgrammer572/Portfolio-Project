# PORTFOLIO-BRIEF.md — CAD Portfolio Website

> **If you are Claude Code, read this first:** This file is the complete project
> specification. All stack decisions below are FINAL — do not relitigate them or
> propose alternatives unless something literally does not work. The owner of this
> project is new to Claude Code, web development, and the terminal: explain what
> you are doing as you go, one step at a time, and confirm each step worked before
> moving to the next. Work through the phases IN ORDER. Do not start a phase until
> the previous one is verified complete. **Phase 3 (deployment) is parked — do not
> begin it, suggest it, or create accounts for it until the owner explicitly says
> the site is done and they want to deploy.**

> **Version note:** Specific versions and pricing in this file were verified on
> 2026-06-04. Before installing anything, re-verify the current stable versions
> (web search) rather than trusting the numbers here.

---

## 1. What we are building

A personal portfolio website for mechanical design work. Core feature: visitors
can **view CAD models interactively in 3D in the browser** (orbit / zoom / pan)
and download the original CAD files.

- Source CAD tools: **Fusion 360** and **AutoCAD (3D solids)**
- Site is **mostly static** — project pages, about, contact
- One dynamic feature: a **contact form** (backend included, email wiring deferred to Phase 3)
- Runs entirely on localhost until Phase 3. Total cost for Phases 0–2: **$0**
- GitHub repo (already created, currently just a README):
  **https://github.com/BeginnerProgrammer572/Portfolio-Project** — clone it and
  build inside it; this folder IS the project folder

## 2. Locked stack (do not re-decide)

| Layer | Choice | Why |
|---|---|---|
| Frontend | React 19 + **TypeScript** + Vite | TS catches errors at build time; Vite is the standard toolchain |
| 3D viewer | react-three-fiber + drei | The standard React wrapper for three.js; excellent TS types |
| Model format | **GLB** (Draco-compressed) | Small files, fast loads, full material support; ~1–5 MB per part |
| Content model | `projects.json` + static files | No database — adding a project = add a folder + JSON entry |
| Backend | **FastAPI** (Python), single endpoint `/api/contact` | Owner wants FastAPI in the stack; one real job: the contact form |
| Email delivery | **Resend** (3,000/mo free tier) — **Phase 3 only** | Until then the endpoint runs in dev mode (prints to console) |
| Hosting | **DigitalOcean App Platform** — **Phase 3 only** | Static component $0 + FastAPI service $5/mo; buildpacks, no Docker |
| Domain | **Cloudflare registrar** — **Phase 3 only** | At-cost pricing; DNS stays on Cloudflare nameservers |

**Explicitly rejected — do not reintroduce:**
- Database of any kind (App Platform filesystem is ephemeral; managed DB is $15/mo overkill)
- SendGrid (free tier discontinued for new accounts in 2025)
- Form services (Formspree etc.) — owner chose to build the form with FastAPI
- Raw Droplet/VPS hosting (unnecessary sysadmin burden)
- Viewing STEP files directly in the browser via WASM (heavy; GLB pipeline chosen instead)
- Docker (App Platform buildpacks handle containerization)

---

## Phase 0 — Environment setup

Install and verify each, in order. Confirm each version check passes before the
next install. All are free.

| Tool | Minimum version | Verify with |
|---|---|---|
| Git | any recent | `git --version` |
| Node.js | **22 LTS** (Vite requires 20.19+ / 22.12+) | `node --version` |
| Python | **3.13** (matches DO buildpack default) | `python --version` |
| Blender | latest stable | launches |

Notes:
- On Windows, install from the official sites (or `winget`). Avoid third-party bundles.
- Blender is the CAD → GLB converter. It is used as a desktop app, not from code.
- Claude Code should also confirm `npm --version` works after the Node install.

## Phase 1 — Boilerplate

Claude Code does all of this. Target structure:

```
portfolio/
├── frontend/                  # Vite + React 19 + TypeScript
│   ├── src/
│   │   ├── components/
│   │   │   └── ModelViewer.tsx    # reusable 3D viewer (r3f + drei)
│   │   ├── pages/                 # Home, Projects, ProjectDetail, About, Contact
│   │   └── data/projects.json
│   └── public/
│       └── models/                # GLB files + downloadable STEP/DWG
└── backend/
    ├── main.py                # FastAPI app, /api/contact only
    └── requirements.txt
```

Requirements:
1. **Scaffold:** `npm create vite@latest frontend -- --template react-ts` is fine
   (ask the owner before running it, since it downloads and executes a registry
   package). After scaffolding, pin all dependency versions exactly — no `^`/`~`
   ranges (`npm install <pkg> --save-exact` / `save-exact=true` in `.npmrc`).
2. **3D dependencies:** `three`, `@react-three/fiber`, `@react-three/drei`,
   `@types/three`. Verify current compatible versions at install time.
3. **ModelViewer component:** takes a GLB path prop; OrbitControls + sensible
   studio lighting (drei `Stage` or equivalent); loading state while the GLB
   streams in; lazy-load the three.js chunk so non-project pages stay light.
4. **Ship a sample GLB** (any free test model, or a Blender default cube exported
   as GLB) so the viewer demonstrably works before any real CAD files exist.
5. **`projects.json` schema** — one placeholder entry:
   ```json
   {
   	"id": "sample-part",
   	"title": "Sample Part",
   	"summary": "One-line card text",
   	"description": "Longer text for the detail page",
   	"tool": "fusion360",
   	"model": "/models/sample-part.glb",
   	"downloads": [{ "label": "STEP", "path": "/models/sample-part.step" }],
   	"images": [],
   	"tags": ["bracket", "aluminum"],
   	"date": "2026-06"
   }
   ```
6. **FastAPI backend:** `POST /api/contact` accepting `{ name, email, message, website }`.
   - `website` is a **honeypot** field — invisible in the UI; if non-empty, return 200 but silently drop
   - Validate with Pydantic; basic per-IP rate limiting
   - **Dev mode:** print the submission to the console. Structure the send step so
     Resend can be swapped in later by setting an env var — no email account needed now
7. **Dev servers:** Vite on 5173 with a proxy of `/api` → `http://localhost:8000`;
   uvicorn on 8000 with `--reload`. Document both run commands in a short README.
8. **Git:** the project lives in the cloned repo (see section 1), so git is already
   set up. Add a sensible `.gitignore` (node_modules, __pycache__, .env, dist)
   before the first install. Commit locally as work progresses; pushing to GitHub
   is optional during Phases 1–2 (recommended as a backup) — nothing deploys from
   it until Phase 3.

**Phase 1 is done when:** both dev servers run, the sample model is spinnable in
the browser, and a test form submission prints in the backend console.

## Phase 2 — Build the actual site

The long part. Two design paths — owner picks:

- **Path A (preferred): Claude Design** (claude.ai/design — requires Claude Pro/Max).
  Owner prototypes the site there in High Fidelity mode — pages: Home, Projects
  grid, Project detail (leave a placeholder pane where the 3D viewer goes), About,
  Contact. Desktop + mobile. Export the **handoff bundle** and give it to Claude
  Code to implement faithfully.
- **Path B: Claude Code designs directly.** Aim for a technical, precise,
  engineering-portfolio aesthetic where the 3D models are the hero — not a generic
  AI-looking template.

Site requirements regardless of path:
- Pages: Home, Projects grid, Project detail (viewer + description + images +
  download buttons), About, Contact
- Contact page: form wired to `/api/contact` (name, email, message + hidden honeypot)
- Mobile responsive; the viewer must work with touch controls (drei handles this)
- Show a "Loading model…" state; keep Lighthouse-style performance in mind
  (lazy three.js, compressed GLBs)

### CAD → web pipeline (owner does the exports, ~2 min per model)

**From Fusion 360:**
1. Viewer file: right-click the body/component → *Save as Mesh* → **OBJ** (or STL)
2. Download file: File → Export → **STEP**

**From AutoCAD (3D solids):**
1. Check units first (`UNITS` / `INSUNITS`)
2. Viewer file: `STLOUT` (or 3DPRINT → Export) → **STL**
3. Download file: the **DWG** itself (or route through Fusion for a STEP)

**Blender conversion (both):**
1. File → Import → OBJ/STL
2. Optional: shade auto smooth for nicer curved surfaces
3. File → Export → **glTF 2.0 (.glb)** — enable **Draco mesh compression**
4. Drop the `.glb` in `frontend/public/models/`, add the STEP/DWG beside it,
   add a `projects.json` entry

**Phase 2 is done when:** the owner's real projects are on the site, everything
works locally on desktop + a phone-sized viewport, and the owner is happy with
the design.

## Phase 3 — Deployment (PARKED — read, but do not act)

Recorded so nothing needs re-researching later. Begin only on explicit request.

1. **GitHub:** already exists (section 1) — just make sure the latest work is pushed to `main`.
2. **DigitalOcean App Platform** (Compute category): create an app from the repo
   with two components —
   - *Static site* from `frontend/` (build: `npm ci && npm run build`, output `dist/`) — **$0**
   - *Web service* from `backend/` (Python buildpack auto-detects `requirements.txt`;
     run: `uvicorn main:app --host 0.0.0.0 --port 8080`) — **$5/mo**, smallest instance (512 MB)
   - Route `/api` → the service; everything else → static. Same origin, so no CORS work.
   - Auto-deploy on push is on by default. HTTPS automatic.
3. **Resend:** create account, get API key, set as App Platform env var (encrypted).
   Without a custom domain Resend only sends to the account owner's own email
   (fine for a contact form); verifying the custom domain removes that limit.
   Set the visitor's email as `reply_to`.
4. **Cloudflare:** register the domain (~$10/yr, must use Cloudflare nameservers).
   Add the domain in DO App Platform settings, create the CNAME in Cloudflare
   **DNS-only mode (gray cloud)** so DO can issue its Let's Encrypt cert. Proxy
   can be enabled afterwards if desired.
5. Re-verify DO pricing at deploy time (verified 2026-06-04: 3 static-only apps
   free; services from $5/mo; egress overage $0.02/GiB; old Basic/Professional
   tiers no longer exist).

---

## Working agreements for Claude Code

- One phase at a time; verify before advancing. Never jump ahead to deployment.
- The owner is a beginner: before each terminal command, say in one plain sentence
  what it does. After it runs, confirm what happened.
- Ask before anything that costs money, creates an account, or publishes anything.
- Prefer boring, standard solutions. No extra dependencies beyond what is listed
  without asking.
- If something in this brief conflicts with reality (version gone, API changed),
  stop and explain instead of improvising silently.
