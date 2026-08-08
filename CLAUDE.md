# CLAUDE.md — Portfolio Project

Read this before touching any code in this repo.

## What this is
Bryan's personal portfolio site. Public, no login gate. Deploys to
Cloudflare Pages. GitHub: github.com/BeginnerProgrammer572/Portfolio-Project

## Stack (locked — do not re-decide)
- Next.js 14, App Router, JavaScript only (no TypeScript)
- React 18
- Tailwind CSS 3
- Deployment target: Cloudflare Pages
- Backend: one API route only — `app/api/contact/route.js`
- No database

## Workflow — same pattern as Kern Opportunity Finder
This project is developed locally with Claude Code, not built for Bryan in
chat. The chat's role from here on is planning, review, and troubleshooting
— not writing the files.

1. **Plan** — for anything beyond a trivial fix, use Plan Mode first. Lay
   out the approach, get it reviewed, then implement.
2. **Implement** — Bryan drives Claude Code through the actual build.
   `frontend-design` and `ECC` plugins are available (user-level, work in
   any project). GStack is not yet working — see dev-environment notes.
3. **Review** — check the change actually does what was planned before
   moving on. Don't stack unreviewed changes.
4. **Commit** — commit after each meaningful change, with a real message.
   Small, frequent commits over one giant one.

## Content rules — no names
No collaborator names anywhere on the site — for any project, not just
this one. Role/context framing is fine and encouraged instead: "tech
lead," "collaborative project," "mentoring while building," "solo
project," etc. Get the collaboration status right per project (some are
solo, some are team, some are "sharing ideas with someone building the
same thing separately") — don't default to team framing everywhere.

## Portfolio content — selection criteria
Not every project Bryan works on belongs here. Weigh whether a project
actually shows skills/real work, not just school involvement:
- **In:** VEX Robotics, Kern Opportunity Finder (in progress), Almond
  Project (in progress, private — image + short description only, no
  link, no build details until complete)
- **Idea-stage / planned work** goes in the lightweight "What I'm
  building next" list, not a full project card, until there's something
  real to show: ESP32 PID Ball Balancer (planned), Coding Curriculum
  Guide (idea stage — merges the Bakersfield Robotics curriculum idea and
  the VEX programming guide idea)
- **Left off entirely:** Code Ninjas (job, not a project), VEX 11th-grade
  prep (school prep, not a discrete project), the Portfolio Project itself
  (self-referential), habit/goal tracker (idea stage, nothing built)

Revisit this list as projects change status — a "planned" item that gets
built should move up to a full card; check the actual current status
before describing anything as built.

## CAD section
3D viewer (react-three-fiber + drei + GLB) is the direction, not the
static render fallback — bring that back when next working on this
section. Onshape can export GLB directly; no Blender step needed.

## Design system
Changelog / GitHub Releases concept (replaced the earlier blueprint/
schematic navy theme — see log below). Light developer-tool palette:
canvas `#FFFFFF`, panel `#F6F8FA`, border `#D8DEE4`, ink `#14171A`, muted
`#59636E`, link `#0B6FDA` (also the `[software]` tag color), diffgreen
`#1A7F37` (patch/diff `+` lines), tagrobotics `#BC4C00`, tagcad `#8250DF`,
tagembedded `#0E8A6E`. System UI font stack for body/headings, JetBrains
Mono for version tags/hashes/dates/tag badges/the package.json block. The
whole site is one continuous page — repo header (`RepoHeader.js`) → intro
(`Hero.js`) → skills as a `package.json` block (`Skills.js`) → a semver
release timeline (`ReleaseFeed.js`/`ReleaseEntry.js`) covering every
project/CAD/robotics/award/next-up item as tagged entries, newest first →
contact. All real photos, no stock imagery — crop/process what's real
rather than fabricate placeholders.

## Contact form
`app/api/contact/route.js` — validates name/email/message, honeypot
field, per-IP rate limiting. Email delivery via Resend still deferred —
prints to console in dev.

## Scope violations / rejected outputs log
- 2026-08-07: First redesign pass (an "engineering drawing sheet" theme
  — title blocks, dimension lines, drafting sheet numbering) was
  rejected before implementation in favor of the changelog/Releases
  concept above. Don't resurrect the drafting-sheet direction without
  Bryan asking for it again.
