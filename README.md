# CreatorPulse — AI Analytics Copilot

CreatorPulse is a full‑stack SaaS that ingests creator analytics, normalizes multi‑platform data, and generates actionable recommendations and content ideas with an AI copilot. The experience is obsessively designed to feel world‑class and minimal (Linear/Vercel/Notion inspired) while remaining pragmatic to run.

---

## Problem Statement

Creators and small teams struggle to translate scattered platform metrics into concrete, revenue‑driving actions. Existing tools either drown users in charts or provide generic advice without understanding their actual data.

CreatorPulse solves this by:
- Unifying analytics from multiple platforms into a common schema
- Deriving posting windows, platform focus, risks, and themes via a Python “Data Brain”
- Converting raw insights into clear narratives, prioritized actions, and content ideas with an AI copilot
- Offering a premium, fast UI with a built‑in “Ask CreatorPulse” chat for follow‑ups

---

## Architecture Plan

High‑level view of the system boundaries and responsibilities:

```
[ React + Vite Frontend ]  ──axios──▶  [ Node/Express API ]  ──spawn──▶  [ Python Data Brain ]
				 │                                 │                                │
				 │                                 │                                └─ Heuristics over normalized data
				 │                                 │
				 │                                 ├──▶  [ OpenAI (LLM) ]  → narrative + Q&A answers
				 │                                 │
				 └──protected routes──────────────▶│
																					 ▼
																			[ MongoDB ]
```

Key components:
- Frontend: SPA with React (Vite), Tailwind, Framer Motion; shadcn token usage; React Query for data.
- Backend: Node/Express, Mongoose, Passport Google OAuth, JWT auth, file uploads with Multer.
- AI Data Brain: Python script computes deterministic recommendations (posting windows, focus, alerts, themes).
- LLM Layer: OpenAI converts numeric results into narratives and answers user questions.
- Caching: In‑memory cache per user for recommendations (6h TTL) to avoid repeated Python/LLM work.

---

## System Design

### Request Flows

1) Upload JSON analytics
```
Client → POST /upload/json (auth, multer) → persist raw items to Mongo → normalize later in Data Brain
```

2) Get recommendations (primary feature)
```
Client → GET /ai/recommendations (auth)
	↳ Cache hit? return cached payload
	↳ Else: fetch user docs → shape payload → spawn Python Data Brain
			→ parse JSON → call OpenAI for narrative → combine → cache 6h → respond
```

3) Ask CreatorPulse (Q&A)
```
Client → POST /ai/ask (auth, { question })
	↳ Ensure we have recent recommendations (cache or quick compute)
	↳ Ask OpenAI with the recommendations JSON as context → return formatted answer
```

### Resilience & Safety
- Python deps are optional at runtime: Data Brain degrades gracefully if heavy libs are missing (uses pure‑Python branches).
- LLM failures do not block core numeric results; the backend returns numbers even if narrative fails.
- CORS locked to configured origins; cookies used for session; JWT for auth APIs.

### Performance
- React Query caches client data; server caches expensive recommendation computations for 6 hours.
- Python computes per‑platform stats in O(n) over the uploaded posts.

---

## Database Plan

MongoDB with two core collections and room to expand.

### Collections

1) `users`
- Fields: `username`, `email` (unique), `password` (optional for Google‑only), `googleId`, timestamps
- Auth: email/password via bcrypt, Google OAuth via Passport

2) `analytics`
- Fields: `userId` (ref User), `platform`, `postedAt`,
	`metrics` (aggregate counters), `rawItems` (original posts array)
- The Python Data Brain consumes `rawItems` to compute platform windows, alerts, and themes.

### Recommended Indexes
- `analytics: { userId: 1, platform: 1, postedAt: -1 }`
- `users: { email: 1 }` unique

---

## API Overview

Base URL (dev): `http://localhost:5000`

Auth (`/auth`)
- `POST /register` — email signup
- `POST /login` — email login
- `POST /logout` — end session
- `GET /me` — current user profile
- `PATCH /update-profile` — update username/email
- `GET /google` → `GET /google/callback` — Google OAuth
- `GET /google/status` — OAuth status

Upload (`/upload`)
- `POST /json` — multipart upload of up to 10 JSON files (auth)

Analytics (`/analytics`)
- `GET /overview` — basic aggregates (auth)
- `DELETE /clear` — delete all analytics for current user (auth)

AI (`/ai`)
- `GET /recommendations` — compute/cached recommendations + LLM narrative (auth)
- `POST /recommendations/clear-cache` — clear server cache (auth)
- `POST /ask` — ask follow‑up questions with recommendations as context (auth)

---

## Frontend Tech Stack (versions)

- React `19.2.0`, React DOM `19.2.0`
- Vite `7.2.4`
- Tailwind CSS `3.4.18` (+ tokens via shadcn conventions)
- Framer Motion `12.23.24`
- React Router DOM `7.9.6`
- React Query (`@tanstack/react-query`) `5.90.10`
- Axios `1.13.2`
- Lucide React `0.554.0`
- Recharts `3.5.0`
- Zustand `5.0.8`

Dev/Tooling
- TypeScript `~5.9.3` (types enabled for DX)
- ESLint `9.39.1`
- @vitejs/plugin-react `5.1.1`

Environment
- `VITE_API_BASE` — backend URL (e.g., `http://localhost:5000` or your domain)

### Frontend Implementation Details

Key design & engineering decisions that elevate the UX and maintainability:

- **State Strategy:** Split between server state (React Query) and client/UI state (Zustand). React Query handles caching, background refetch, stale timing, and request deduplication; Zustand stores ephemeral UI such as auth session and theme without introducing global re‑renders.
- **Data Fetching & Resilience:** React Query wrappers provide consistent loading / error boundaries. StaleTime tuned (10m) for recommendations to avoid unnecessary recomputation; manual cache clear triggers regeneration.
- **Design System Tokens:** Tailwind CSS custom CSS variables defined in `index.css` for light/dark themes (background, card, border, primary, muted). All semantic components reference these tokens ensuring instant theme parity.
- **Component Architecture:** Page‑level containers (`pages/`) compose small presentational units under `components/recommendations/*` (PageHeader, HeroCard, SummarySection, ContentIdeasGrid, ChatPanel) promoting isolation and reuse.
- **Animation Layer:** Framer Motion powers mount / hover / typing animations with minimal code; motion kept shallow (opacity/translate) for GPU efficiency.
- **Accessibility & Semantics:** Consistent focus rings (`focus-visible:*`), descriptive button labels, semantic headings hierarchy (h1→h2→h3). Chat bubbles avoid exotic roles so screen readers can linearize content.
- **Markdown Safe Rendering:** Naïve markdown from the AI is sanitized via string replacement ensuring no script injection while preserving emphasis and headings.
- **Performance Considerations:** Critical CSS via Tailwind JIT; code splitting manageable through Vite’s build. Avoid heavy charting libraries except where needed (Recharts). No global context bloat—Zustand slices remain small.
- **Dark/Light Harmony:** All colors route through HSL variables enabling systematic palette tweaks and consistent contrast ratios; no hardcoded hexes except micro‑gradient accents.
- **Future Extensibility:** ChatPanel built to accept richer message objects (role, timestamp, feedback) → easy path to add memory or rating features.

---

## Backend Tech Stack (versions)

- Node.js (tested locally with 18/20), Express `5.1.0`
- Mongoose `9.0.0` (MongoDB 6.x compatible)
- JWT (`jsonwebtoken`) `9.0.2`
- Passport `0.7.0` + `passport-google-oauth20` `2.0.0`
- Multer `2.0.2` (uploads)
- OpenAI SDK `6.9.1`
- bcryptjs `3.0.3`
- cookie-parser `1.4.7`, cors `2.8.5`, morgan `1.10.1`, dotenv `17.2.3`

Python AI (Data Brain)
- Python 3.10+/3.11
- `pandas>=1.5`, `numpy>=1.23`, `scikit-learn>=1.2`, `python-dateutil>=2.8` (see `backend/ai/requirements.txt`)

Key Environment Variables
- `NODE_ENV`, `PORT` (default 5000)
- `MONGODB_URI` — connection string
- `JWT_SECRET` — 32+ char secret
- `OPENAI_API_KEY` — for narrative/Q&A
- `CLIENT_URL` — frontend origin for CORS & cookies
- `CORS_ORIGINS` — comma‑separated allowed origins
- `BRAND_NAME` — optional branding in responses
- `PYTHON_BIN` — optional override (default `python3`)

### Backend Implementation Details

- **Layered Responsibilities:** Express routes are thin → controllers orchestrate data retrieval and transformation; services (`contentBrain.js`) encapsulate LLM interactions; Python script encapsulates deterministic analytics heuristics.
- **Python Isolation:** `recommendationController` spawns `data_brain.py` via `child_process.spawn` with streamed stdout/stderr capture, avoiding blocking the Node event loop and permitting graceful error handling.
- **Optional Dependencies & Degradation:** The Data Brain attempts to use pandas/numpy/scikit‑learn if available; falls back to pure JavaScript‑serializable list/loop logic, keeping functionality on constrained hosts (e.g., basic cPanel without compiled wheels).
- **Caching Strategy:** In‑memory Map keyed by `userId` with 6h TTL reduces repeated Python computations and LLM calls. Explicit cache clear endpoint supports manual regeneration for updated uploads.
- **LLM Resilience:** Narrative generation guarded by try/catch; failure returns numeric recommendations untouched ensuring core value even if OpenAI is transiently unavailable.
- **Security Controls:** JWT auth middleware populates `req.userId`; CORS strictly whitelists configured origins; Google OAuth integration via Passport; passwords hashed with bcryptjs. Minimal attack surface—no eval, no dynamic code loading.
- **Upload Handling:** Multer accepts up to 10 JSON files per request with size/quantity limits; originals stored in `rawItems` for transparency and later reprocessing.
- **Data Shaping:** A normalization function (`fromDocsToPlatforms`) creates a platform→posts map consumed by Python for uniform heuristics (posting times, volatility, theme frequency).
- **Error Surface:** Central error handler returns consistent JSON shape (`{ success: false, error }`) aiding frontend simplification. Python spawn errors bubble with enriched message.
- **Extensibility:** Clear seams to add: persistent Redis cache, background queue (BullMQ) for batch analytics, feedback endpoint for reinforcement learning ranking.
- **Environment Flexibility:** `PYTHON_BIN` override allows deployment on systems where `python3` might be symlinked differently; supports virtualenv activation via absolute path.
- **Testing Strategy (Future):** Unit tests could stub `generateNarrative` and inject fixture analytics to validate Python bridging without calling the real LLM.

---

## Local Development

Prereqs: Node 18+ (or 20), Python 3.10+, MongoDB (local or Atlas).

```bash
# 1) Backend
cd backend
npm install

# optional: install Python libs for Data Brain
python3 -m venv ai/venv
source ai/venv/bin/activate
pip install -r ai/requirements.txt

# env
cp .env.example .env  # or create .env with variables from this README
npm run dev

# 2) Frontend
cd ../frontend
npm install
npm run dev
```

Default dev URLs
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

---

## Deployment Notes (quick)

You can deploy via:
- cPanel (Node.js app for backend + static frontend `dist/`),
- Docker Compose (backend + frontend + Mongo),
- Managed platforms (Railway/Render/DigitalOcean App Platform).

Minimum checklist:
- Set production env vars (`MONGODB_URI`, `JWT_SECRET`, `OPENAI_API_KEY`, `CLIENT_URL`, `CORS_ORIGINS`, `NODE_ENV=production`)
- Build frontend (`npm run build`) and serve via CDN/static hosting
- Run backend behind HTTPS and configure CORS to frontend domain
- Optional: PM2 for process management (if VPS), or platform‑native scaling

---

## UI Highlights

- Premium, minimal design with soft shadows, rounded cards, and subtle motion
- Sticky header, gradient CTAs, and a polished chat interface with typing indicator
- Fully responsive across sm/md/lg/xl, dark/light aware via design tokens

---

## Future Enhancements

- Persistent memory for Q&A (ground answers in historical performance)
- Fine‑grained posting windows once timestamped posts are uploaded
- Feedback loop for recommendation quality (accept/reject)
- Background jobs & queues for batch analytics

---

## Repo Structure (condensed)

```
backend/
	ai/                # Python Data Brain
	src/
		controllers/     # auth, analytics, recommendations
		models/          # Mongoose schemas (User, Analytics)
		routes/          # /auth, /upload, /analytics, /ai
frontend/
	src/
		pages/           # Login, Signup, Dashboard, Recommendations
		components/      # UI + recommendations components
```

---

## Credits

Built with care to balance product polish and engineering rigor. If this project resonated with you, I’d love to chat about building delightful, data‑driven products.

