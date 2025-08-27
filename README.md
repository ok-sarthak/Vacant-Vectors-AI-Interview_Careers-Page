# Vacant Vectors – AI Mock Interview Platform

![Vacant Vectors Logo](public/logo_v.png)

Generate role‑specific technical interview questions with Gemini, record spoken answers, and receive instant AI feedback & ratings.

Built with: Next.js 14 App Router • Clerk Auth • Drizzle ORM • Neon Serverless Postgres • Google Gemini • TailwindCSS • Framer Motion

---

## Table of Contents

- Overview
- Key Features
- Tech Stack
- Architecture
	- Data Model
	- Application Flow
- Getting Started (Local Dev)
- Environment Variables
<div align="center">
	<img src="public/logo_v.png" alt="Vacant Vectors" width="96" />
	<h1>Vacant Vectors – AI Mock Interview Platform</h1>
	<p><strong>Generate role‑specific interview questions with Gemini, record voice answers, and get instant AI ratings & actionable feedback.</strong></p>
	<p>
		<a href="https://nextjs.org">![Next.js](https://img.shields.io/badge/Next.js-14-black)</a>
		<a href="https://clerk.com">![Clerk](https://img.shields.io/badge/Auth-Clerk-purple)</a>
		<a href="https://orm.drizzle.team">![Drizzle ORM](https://img.shields.io/badge/ORM-Drizzle-00c2ff)</a>
		<a href="https://neon.tech">![Neon](https://img.shields.io/badge/DB-Neon%20Serverless-16c47f)</a>
		<a href="https://ai.google.dev">![Gemini](https://img.shields.io/badge/AI-Gemini-4285F4)</a>
		<a href="#license">![License](https://img.shields.io/badge/License-Proprietary-red)</a>
	</p>
</div>

---

## Contents

| Section | Description |
|---------|-------------|
| Overview | High‑level purpose & value proposition |
| Features | Functional & UX capabilities grouped by category |
| Stack | Technologies by layer |
| Architecture | Layers, flow & sequence diagram (text) |
| Data Model | Table schemas with column details |
| Flow | End‑to‑end interview lifecycle |
| Setup | Local development steps |
| Environment | Required & optional environment variables |
| Database | Drizzle + Neon usage & commands |
| AI Strategy | Prompt, safety & resilience notes |
| Security | AuthZ / AuthN + future hardening ideas |
| Accessibility | Current and planned a11y considerations |
| Scripts | NPM script reference |
| Structure | Project folder layout |
| Deployment | Production considerations |
| Troubleshooting | Common issues & resolutions |
| Roadmap | Planned enhancements |
| Contributing | How to propose changes |
| License | Usage rights |

---

## Overview

Vacant Vectors lets candidates rehearse technical interviews realistically. Provide a role, description & experience range; the platform generates contextual Q&A via Gemini. You answer verbally in a controlled, fullscreen session (with webcam encouragement & optional TTS). Each answer is scored and receives concise improvement feedback, then compiled into a review dashboard.

### Why?
| Challenge | Solution |
|-----------|----------|
| Generic prep lacks personalization | Dynamic Gemini prompts keyed to your role & stack |
| Manual mock sessions require another person | AI generates & evaluates in real time |
| Little actionable feedback | Structured rating (0–10) + targeted improvement notes |
| Distractions & unfair means | Fullscreen + webcam presence + limited navigation |

---

## Features

### Functional & UX Feature Matrix
| Category | Feature | Description | Tech / Notes |
|----------|---------|-------------|--------------|
| Auth | Protected dashboard & interview routes | Middleware gating using Clerk | `middleware.js` route matcher |
| Generation | Role‑aware question synthesis | JSON `{question, answer}` list sized by env count | Gemini 1.5 Flash |
| Interview Session | Fullscreen enforcement | Exiting fullscreen aborts session | Browser Fullscreen API |
| Interview Session | Webcam presence panel | Encourages focus & presence | `react-webcam` |
| Interview Session | Question TTS | Read question aloud for accessibility | Web Speech API (speechSynthesis) |
| Input Capture | Voice → text transcription | Continuous speech recognition | `react-hook-speech-to-text` |
| Feedback | Per‑answer AI rating & tips | 0–10 rating + 3–5 lines improvement | Secondary Gemini prompt |
| Data Persistence | Secure storage of interviews & answers | Two normalized tables | Drizzle + Neon Postgres |
| History | Previous interviews list | Chronological listing & quick links | Dashboard component |
| UI Polish | Animated cosmic backdrop | Framer Motion radial + parallax effect | `framer-motion` |
| Notifications | Toast messaging | Success / error / status updates | `react-toastify` / custom loader |
| Safety | Content moderation | Harm thresholds for harassment/hate/etc. | Gemini safety settings |
| Configurability | Question count via env | Change without code edit | `NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT` |

### Planned (Roadmap Extract)
| Planned Area | Idea | Benefit |
|--------------|------|---------|
| Multi‑Round | Sectioned categories (Algorithms, System Design, Behavioral) | Broader coverage |
| Export | PDF / CSV summary | Shareable progress records |
| Analytics | Trend graphs over attempts | Longitudinal growth insights |
| A11y | ARIA labels / focus traps | Inclusive experience |
| Validation | zod schema for AI JSON | Robustness, safer parsing |
| Proctoring | Tab switch + face heuristics | Fairness & integrity |

---

## Tech Stack

| Layer | Technologies | Notes |
|-------|--------------|-------|
| Framework | Next.js 14 App Router | Server & client components |
| UI | React 18, TailwindCSS, Radix UI, Framer Motion | Responsive + animated UX |
| Auth | Clerk | Middleware + Elements components |
| DB Access | Drizzle ORM (Neon HTTP driver) | Type‑safe queries in serverless env |
| Database | Neon Serverless Postgres | Low‑latency, scalable storage |
| AI | Google Gemini 1.5 Flash | Q generation + feedback rating |
| Media | `react-webcam`, Web Speech API | Video + TTS |
| Speech Recognition | `react-hook-speech-to-text` | Voice input transcription |
| Utilities | `uuid`, `moment`, `clsx`, `class-variance-authority` | IDs, date formatting, styling |

---

## Architecture

### Layered View
| Layer | Responsibility | Key Files |
|-------|----------------|-----------|
| Presentation | Pages & interactive components | `app/**`, `components/ui/**` |
| Auth | Gate protected routes | `middleware.js` |
| AI | Model session & prompts | `utils/GeminiAImodel.js` |
| Data | Schema & queries | `utils/schema.js`, `utils/db.js` |
| Session Flow | Create, start, record, feedback | Components under `dashboard/interview` |

### Sequence (High Level)
1. User signs in → redirected / accesses `/dashboard`.
2. Creates interview (dialog triggers generation prompt).
3. Gemini returns JSON Q&A; persisted with a UUID `mockId`.
4. Lobby: user enables webcam → starts session.
5. Fullscreen Q navigation; each answer recorded & auto‑submitted for feedback.
6. After final question user ends; feedback view aggregates stored results.

### Minimal ASCII Flow
```
User -> Clerk Auth -> Dashboard -> (Prompt) -> Gemini
Gemini -> Q&A JSON -> Drizzle -> Postgres
User -> Start Interview -> Fullscreen + Webcam
Answer -> Speech-to-Text -> Gemini Feedback -> Drizzle -> Postgres
End -> Feedback Page -> Aggregated Answers & Ratings
```

---

## Data Model

| Table | Column | Type | Notes |
|-------|--------|------|-------|
| AiInterview | id | serial PK | Internal identity |
| AiInterview | jsonMockResp | text | Raw JSON array of Q&A objects |
| AiInterview | jobPostition | varchar | (Typo kept) job role title |
| AiInterview | jobDescription | varchar | Input tech stack / responsibilities |
| AiInterview | jobExperience | varchar | Months of experience specified |
| AiInterview | createdBy | varchar | User email (Clerk) |
| AiInterview | createdAt | varchar | ISO date string (improv: timestamp) |
| AiInterview | mockId | varchar | Public lookup UUID |
| UserAnswer | id | serial PK | Internal identity |
| UserAnswer | mockIdRef | varchar | References AiInterview.mockId |
| UserAnswer | question | varchar | Interview question |
| UserAnswer | correctAns | varchar | Model‑generated expected answer |
| UserAnswer | userAns | text | Transcribed user response |
| UserAnswer | feedback | text | Improvement suggestions |
| UserAnswer | rating | varchar | 0–10 (improv: integer) |
| UserAnswer | userEmail | varchar | Redundant copy (improv: remove) |
| UserAnswer | createdAt | varchar | ISO date |

### Improvement Targets
| Area | Change | Rationale |
|------|--------|-----------|
| Naming | jobPostition → jobPosition | Consistency & clarity |
| Types | Date strings → timestamptz | Query & ordering reliability |
| Integrity | Add FK constraint (mockIdRef) | Referential safety |
| Rating | varchar → smallint | Numeric comparisons |
| JSON | Parse & store structured rows | Queryability per question |

---

## Interview Flow (Detailed)
| Step | Action | Trigger | Persistence |
|------|--------|---------|-------------|
| 1 | Create Interview | Dialog submit | Insert AiInterview row |
| 2 | Load Lobby | Page mount | Fetch interview by mockId |
| 3 | Start | Fullscreen request accepted | Client state only |
| 4 | Record Answer | Start/Stop button | Temp transcript in state |
| 5 | Feedback | Auto after stop (>10 chars) | Insert UserAnswer row |
| 6 | Navigation | Prev/Next buttons | State index change |
| 7 | End Session | End button last question | Redirect to feedback page |

---

## Local Development

| Step | Command | Notes |
|------|---------|-------|
| Install deps | `npm install` | Use Node 18+ |
| Env setup | Copy `.env.example` | Fill values before running |
| DB push | `npm run db:push` | Creates tables (dev) |
| Dev server | `npm run dev` | Opens on <http://localhost:3000> |
| Studio (optional) | `npm run db:studio` | Visual inspect Postgres schema |

TypeScript note: Project includes TS config but many components are JSX—progressive migration possible.

---

## Environment Variables

| Name | Scope | Required | Example / Format | Purpose |
|------|-------|----------|------------------|---------|
| DATABASE_URL | Server | Yes | postgres:// | Drizzle kit migrations |
| NEXT_PUBLIC_DRIZZLE_DB_URL | Client/Server | Yes | postgres:// | Runtime Neon HTTP URL |
| NEXT_PUBLIC_GEMINI_API_KEY | Client/Server* | Yes | key string | Gemini API access (consider server only) |
| NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT | Client | Yes | 5 | Controls number of questions |
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY | Client | Yes | pk_... | Clerk frontend key |
| CLERK_SECRET_KEY | Server | Yes | sk_... | Clerk backend operations |
| NEXT_PUBLIC_SITE_URL | Client | No | http://localhost:3000 | Canonical URL |

> Avoid exposing sensitive keys publicly; where possible refactor AI calls server‑side.

---

## Database (Drizzle + Neon)

| Action | Command |
|--------|---------|
| Push schema | `npm run db:push` |
| Open studio | `npm run db:studio` |

Current schema: `utils/schema.js` (simple; no relations enforced yet).

---

## AI Prompting Strategy
| Use Case | Prompt Inputs | Output Shape | Post‑Processing |
|----------|---------------|--------------|----------------|
| Question Generation | Role, description, experience, requested count | JSON array `[ { question, answer } ]` | Strip markdown fences, store raw text |
| Feedback & Rating | Question, transcript answer | JSON `{ rating, feedback }` | Strip fences → JSON.parse → insert row |

Safety settings configured to block medium+ harassment, hate, sexual, dangerous content categories.

Resilience (future): retries, JSON schema validation, circuit breakers, timeouts, structured logging.

---

## Security & Auth

| Aspect | Current | Planned |
|--------|---------|---------|
| AuthN | Clerk middleware protect dashboard/interviews | Session token rotation insights |
| AuthZ | Email match for ownership | Role-based access (admin) |
| Data Access | Direct client inserts (Drizzle) | Move writes to route handlers / RPC layer |
| Secrets | Environment variables | Server-only AI key usage |
| Proctoring | Fullscreen + webcam presence encouragement | Tab switch / face detection heuristics |

---

## Accessibility & UX
| Area | Current | Improvement Ideas |
|------|---------|------------------|
| Visual Focus | Fullscreen, minimal nav | Add focus outlines & skip links |
| Auditory | TTS for questions | Captions for feedback summary |
| Keyboard | Basic navigation | Ensure all dialogs fully keyboard operable |
| Motion | Framer background animation | Offer reduced-motion toggle |

---

## Scripts

| Script | Purpose |
|--------|---------|
| `dev` | Run Next.js dev server |
| `build` | Production build |
| `start` | Start production server |
| `lint` | Run Next linting |
| `db:push` | Apply schema to DB (dev) |
| `db:studio` | Launch drizzle studio |

---

## Project Structure
```text
app/
	(auth)/              # Sign-in / sign-up (Clerk)
	dashboard/
		_components/       # Dashboard widgets
		interview/[id]/    # Lobby / start / feedback pages
components/ui/         # UI primitives
utils/                 # db, schema, AI model session
public/                # Static assets
middleware.js          # Route protection logic
drizzle.config.js      # Drizzle configuration
```

---

## Deployment
| Step | Note |
|------|------|
| 1. Provision Neon | Create Postgres instance; copy connection URI |
| 2. Configure Clerk | Set production URLs & JWT templates if needed |
| 3. Set Env Vars | Add all required keys in platform dashboard |
| 4. Migrate | Run `db:push` (or future migrations) pre-first request |
| 5. Monitor | Track Gemini quota & DB connection usage |

---

## Troubleshooting
| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| Empty feedback page | Answers not long enough to trigger save | Ensure >10 chars before stopping recording |
| JSON parse error | Gemini returned explanatory prose | Re‑try; add schema validation in future |
| Webcam blank | Permission denied | Allow camera in browser settings |
| Fullscreen exit redirect | User pressed ESC | Inform user before starting; handle event gracefully |
| Drizzle push fails | Wrong DATABASE_URL | Verify credentials / Neon project region |

---

## Roadmap
| Category | Item | Status |
|----------|------|--------|
| Validation | zod schemas for AI outputs | Planned |
| Persistence | Strong FK & proper types | Planned |
| UX | Reduced motion toggle | Planned |
| Analytics | Performance trend charts | Planned |
| Export | PDF/CSV result export | Planned |
| Internationalization | i18n support | Planned |
| Proctoring | Face + tab activity signals | Research |

---

## Contributing
1. Fork repository & clone locally.
2. `cp .env.example .env` then fill required values.
3. Create branch `feat/your-feature`.
4. Implement + add/update docs/tests.
5. Open PR with context, screenshots for UI.

---

## License
Proprietary – All rights reserved (replace with MIT / Apache-2.0 if open sourcing).

---

## Quick Start
```bash
cp .env.example .env
npm install
npm run db:push
npm run dev
```

Visit <http://localhost:3000> and sign in to begin.

Happy interviewing! ✨
