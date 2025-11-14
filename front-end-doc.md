Hiring Agent Manager — Full Frontend + Backend Build Documentation & AI Builder Prompt

Format: Markdown (.md) — ready to paste into an AI code generator (Windsurf / Replit / ChatGPT + Code).
Goal: Produce a production-ready, fully-responsive, dark/light theme aware frontend (Next.js) connected to the already-built backend (Express + Supabase). Also scaffold all pages, UI components, UX behavior, endpoints, folder structure, and integration touchpoints (workflow engine like n8n). Include strict API contracts and implementation notes.
Tone: Precise, unambiguous, no hallucinations — use placeholders for secrets and external keys. The AI must deliver code and static assets, tests, and README.

Table of contents

Project overview

High-level architecture

Deliverables for AI builder

Exact folder structures (frontend + backend)

Full pages & UI/UX specification (per page)

UI components, design system & theme rules

Accessibility, responsiveness & performance requirements

Complete API contract (endpoints, request/response schemas)

Workflow (n8n) integration spec (webhooks, triggers)

Testing, linting, build, and deploy instructions

Final AI Builder prompt (copy-paste)

1. Project overview

Project name: Hiring Agent Manager
Purpose: Automate CV intake, AI-based screening, job-to-agent orchestration, and present recruiters with a modern dashboard to manage roles, agents, workflows, and candidate results.
Stack to produce:

Frontend: Next.js (App Router), TypeScript, Tailwind CSS, Shadcn UI (or headless components), React Query (or TanStack Query), Lucide icons.

Backend: Existing Express + Supabase (Postgres). AI builder should assume backend endpoints described below are already available and must be used by frontend.

Workflow engine: n8n (or similar). The frontend/backed must integrate using clear webhook endpoints and trigger APIs. For now, the builder will scaffold triggers → they may be connected to n8n later.

2. High-level architecture
[User Browser] <--> [Next.js Frontend] <--(REST API / JWT)--> [Express Backend + Supabase]
                                            |
                                            `--> [Workflow Engine (n8n)] <---> [LLMs / Gemini]


Frontend stores tokens securely (httpOnly cookie recommended) and uses them for API calls.

Backend handles auth, job & agent CRUD, workflow trigger logging, and webhook endpoints for workflow results.

Workflow engine executes node-by-node automation (CV parsing, LLM scoring) and POSTs results back to backend via /api/workflows/webhook.

3. Deliverables for AI builder

A complete Next.js project (TypeScript) with pages and components described below.

TailwindCSS config and theme toggling (light/dark).

Shadcn or equivalent UI primitives; use Lucide icon set with clear icon usage comments.

API client (lib/api.ts) that reads NEXT_PUBLIC_API_URL and uses fetch + React Query with proper error handling.

Auth flows (login, register, logout). Use httpOnly cookie token recommended — if not possible, use localStorage with secure notes.

All pages and components must be responsive and accessible (A11y).

Integration for file uploads (CVs) using a client-to-backend multipart/form-data POST route.

Mock AI/evaluation pages (if backend/LLM not present) that show expected data.

Workflow trigger UI for assigning agents & starting workflows.

Workflows logs & detail pages with clear status indicators and retry button calling backend API.

Settings page for API keys, webhook config and toggles.

README with setup, .env.local example, build, and deploy instructions.

Unit tests skeleton (Jest + React Testing Library) for critical components and at least one E2E test (Playwright recommended).

4. Folder structures
Frontend (Next.js, TypeScript)
frontend/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx (Dashboard)
│  ├─ login/page.tsx
│  ├─ register/page.tsx
│  ├─ jobs/
│  │  ├─ page.tsx (List)
│  │  ├─ new/page.tsx (Create)
│  │  └─ [id]/page.tsx (View)
│  ├─ agents/
│  │  ├─ page.tsx (List)
│  │  ├─ new/page.tsx
│  │  └─ [id]/page.tsx (Detail/Edit)
│  ├─ workflows/
│  │  ├─ page.tsx (Run / Logs)
│  │  └─ logs/[id]/page.tsx (Log Detail)
│  ├─ candidates/
│  │  ├─ page.tsx (List)
│  │  └─ [id]/page.tsx (Candidate Detail)
│  ├─ settings/page.tsx
│  └─ profile/page.tsx
├─ components/
│  ├─ ui/ (Button, Input, Modal, Table, Card)
│  ├─ layout/ (Sidebar, Topbar, Footer, ThemeToggle)
│  ├─ jobs/ (JobForm, JobCard)
│  ├─ agents/ (AgentForm, AgentCard, AgentToggle)
│  └─ workflows/ (TriggerModal, WorkflowStatus)
├─ lib/
│  ├─ api.ts (axios/fetch wrappers)
│  ├─ auth.ts (login/logout helpers)
│  └─ config.ts
├─ hooks/
│  ├─ useAuth.ts
│  ├─ useJobs.ts
│  ├─ useAgents.ts
│  └─ useWorkflows.ts
├─ styles/
│  └─ globals.css (Tailwind imports)
├─ public/
│  └─ icons/ (favicons)
├─ tests/
│  └─ components/
├─ next.config.js
├─ tailwind.config.js
├─ tsconfig.json
└─ package.json

Backend (existing — reference; AI should not re-create but may add client code)
backend/
├─ src/
│  ├─ routes/ (auth, users, jobs, agents, workflows)
│  ├─ services/ (jobService, agentService, workflowService)
│  ├─ controllers/
│  └─ config/
└─ supabase.sql

5. Full pages & UI/UX specification

Design principles: Clean, minimal, task-first dashboards. Use spacing & card layouts. Primary accent color + neutral palette. Icons used sparingly. Support both light/dark. Keep interactions intentional and fast.

Global layout

Left sidebar (collapsible) with icons + labels: Dashboard, Jobs, Agents, Workflows, Candidates, Settings, Profile (use Lucide icons).

Topbar: search, notification bell (shows workflow alerts), user avatar (menu: Profile, Logout).

Content area: responsive grid; cards for metrics.

Pages
1. Login (/login)

Fields: email, password, remember me (optional)

Actions: Login button, link to Register

Error states: invalid credentials, network error

UI: center form, small illustration, clear CTA

On success: redirect to Dashboard

2. Register (/register)

Fields: full name, email, password, role (Recruiter/Admin)

Validation: zod-like rules; show inline errors

On success: auto-login and redirect

3. Dashboard (/)

KPI cards: Total Jobs, Active Agents, Running Workflows, Candidates processed today

Recent activity list (workflow logs)

Quick actions: Create Job, Run Workflow, Upload Candidate (CV)

Chart: workflows by status (small bar or donut) — use Recharts or simple SVG

4. Jobs list (/jobs)

Table with columns: Title, Status (badge), Created by, Assigned agents (icons), Created at, Actions (View, Edit, Assign agents)

Filters: status, search by title, date range

Bulk actions: Delete, Export CSV

Pagination: server-side (React Query)

5. Create Job (/jobs/new)

Large form with sections:

Basic info (title, description)

Requirements (skills tags, min years)

Compensation & location

Assign default agents (select multi)

Preview panel to show job summary

Save as draft vs Publish

6. Job view (/jobs/[id])

Top: job header (title, status, progress indicator)

Left column: Job details (description, skills, created_by)

Middle: Assigned agents list (cards with edit & toggle), button “Assign agents” opens modal

Right: Workflow panel — shows last workflow run for this job with status + button “Trigger workflow now”

Bottom: Candidates returned (once workflows run) — list of candidate cards with score, actions (View candidate, Shortlist, Reject)

Audit timeline: shows workflow logs (fetched from /api/workflows/logs)

7. Agents list (/agents)

Table with name, type, status (toggle), last used, actions (Edit, View)

Floating “Create agent” button

8. Create / Edit Agent (/agents/new, /agents/[id])

Fields:

Name

Type (dropdown: Screening, Research, Email, HR Expert, Custom)

Config JSON editor (collapsible; show safe defaults)

Status toggle (Active/Inactive)

Human-friendly instructions (textarea) used as system prompt

Save button with validation (config must be valid JSON)

If editing, show last run logs

9. Workflows (/workflows)

Trigger workflow UI: select Job, choose agents (multi), input payload (optional JSON editor), Trigger button

Logs list with filters (status), search, retry button per log

Workflow detail: payload in/out JSON, timestamps, agent steps (if available)

10. Candidates (/candidates)

List of all processed candidate results; columns: name, email, job applied, score, recommendation (badge), actions (view, export)

Candidate detail: full parsed CV (highlighted matched skills), LLM explanation, structured JSON, history of re-runs

11. Settings (/settings)

API keys (input, masked) for external integrations (Google Drive, Sheets, Gemini) — store in backend as secrets (not in client)

Webhook configuration: view & test webhook endpoint

Theme toggle default (light/dark)

Notification preferences

12. Profile (/profile)

User info, change password, API tokens (revoke/regenerate)

6. UI components, design system & theme rules
Design tokens

Primary: #2563EB (blue)

Accent: #06B6D4 (teal)

Neutral (light): #F8FAFC background, #0F172A text

Neutral (dark): #0B1220 background, #E6EEF8 text

Radius: 8px (cards), 6px (buttons)

Spacing: 4,8,12,16,24,32 scale (Tailwind spacing)

Theme behavior

Use Tailwind dark: class strategy.

Add prefers-color-scheme detection and user override in Settings.

Ensure all icons & illustrations adapt (use CSS filters or separate SVG fills).

Icons

Use Lucide icons. Suggested icons for clarity:

Dashboard: Grid

Jobs: Briefcase

Agents: Cpu

Workflows: GitPullRequest or Repeat

Candidates: UserCheck

Settings: Settings

Notifications: Bell

Keep icons small (20–22px) and use them with text labels in sidebar.

Buttons & Interactions

Primary button: filled with Primary color, subtle shadow, concise text.

Secondary: outline.

Danger: red filled for deletes.

Use tooltips for icon-only buttons.

Modals must be keyboard accessible and focus-trapped.

7. Accessibility, responsiveness & performance
Accessibility (A11y)

All interactive elements must have aria-* attributes where appropriate.

Form inputs must have associated <label> elements.

Keyboard navigation: sidebar, modal close, form submission accessible.

Color contrast: maintain 4.5:1 for text and interactive elements.

Responsiveness

Desktop: 3-column layout for detail pages (left details, middle main, right workflow).

Tablet: 2-column stack.

Mobile: Single column; collapsible sidebar becomes hamburger menu.

Performance

Use code-splitting (Next.js App Router auto).

Lazy-load heavy components (JSON editors, charts).

Use client-side caching with React Query; set staleTime appropriately.

Optimize images and SVGs.

Use next/image for user avatars where possible.

8. Complete API contract (all endpoints)

Base URL: {API_BASE} (set NEXT_PUBLIC_API_URL)

Auth

POST /api/auth/register

Body: { "email":"", "password":"", "full_name":"", "role":"Recruiter" }

Response: { user: { id, email, full_name, role }, token }

POST /api/auth/login

Body: { "email":"", "password":"" }

Response: { user, token }

GET /api/auth/me

Headers: Authorization: Bearer <token>

Response: { user }

Users

GET /api/users (Admin)

Response: { data: [{ id, email, full_name, role, created_at }] }

GET /api/users/:id

PATCH /api/users/:id/role { role: "Recruiter" }

Jobs

GET /api/jobs

Query: ?status=open&page=1&perPage=20&q=react

Response: { data: [ { id, title, description, status, created_by, created_at, assigned_agents: [] } ], meta: { total, page } }

GET /api/jobs/:id

Response: { data: { id, title, description, status, created_by, created_at, assigned_agents: [], recent_workflows: [] } }

POST /api/jobs (Auth: Recruiter/Admin)

Body: { title, description, skills: string[], min_experience: number, location, salary_range, assign_agents: [agentId] }

Response: { data: job }

PATCH /api/jobs/:id

DELETE /api/jobs/:id

POST /api/jobs/:id/assign-agents

Body: { agent_ids: [uuid] }

Response: { data: { job_id, assigned_agents } }

Agents

GET /api/agents

GET /api/agents/:id

POST /api/agents (Auth: Recruiter/Admin)

Body: { name, type, config: {}, instructions: string, status: "active" }

Response: { data: agent }

PATCH /api/agents/:id

DELETE /api/agents/:id

PATCH /api/agents/:id/toggle { status: "active" }

Workflows

POST /api/workflows/trigger (Auth: Recruiter/Admin)

Body: { job_id, agent_ids: [], input_payload: {} }

Response: { id: logId, status: 'queued', created_at }

GET /api/workflows/logs

Query: ?status=running&page=1

Response: { data: [ { id, job_id, agent_id, status, input_payload, output_payload, created_at } ] }

GET /api/workflows/logs/:id

PATCH /api/workflows/logs/:id (Admin) — update status/output

Body: { status: 'succeeded', output_payload: {...} }

Candidates (result from workflow runs)

GET /api/candidates

Response: { data: [ { id, name, email, score, recommendation, job_id } ] }

GET /api/candidates/:id

Response: { data: { parsed_cv: string, structured: {}, model_explanation: string, attachments: [ { url } ] } }

POST /api/candidates/upload (multipart) — upload CV; backend triggers parsing (returns job/log id)

Settings / Integrations

GET /api/settings

POST /api/settings — store masked keys via backend

Body: { google_sheets_id, google_service_account_key (server-only), notify_webhook_url }

POST /api/webhooks/test — send test POST to configured webhook.

Error format: All endpoints must return HTTP status codes and JSON body { error: { message: string, code?: string, details?: any } } on failures.

9. Workflow (n8n) integration spec
1. Triggering workflows

Frontend calls POST /api/workflows/trigger with job_id, agent_ids, input_payload.

Backend creates workflow_logs row (status queued) and returns id.

Backend sends a fire-and-forget webhook to the configured n8n webhook URL (if configured) with payload:

{
  "log_id": 12345,
  "job_id": "uuid",
  "agent_ids": ["uuid"],
  "input_payload": { /* user provided */ }
}


n8n executes nodes (CV fetch, parse, LLM calls). After completion, n8n POSTS result to backend webhook /api/workflows/webhook.

2. Webhook endpoint (backend)

POST /api/workflows/webhook

Payload:

{
  "log_id": 12345,
  "status": "succeeded",
  "output_payload": { /* structured: candidates, scores, model_explanations */ },
  "steps": [ /* optional detailed steps per agent */ ]
}


Backend updates workflow_logs row and persists candidates & results. Backend sends notification to configured webhook or to users.

3. Retry mechanism

POST /api/workflows/logs/:id/retry — backend will requeue and call n8n webhook again.

10. Testing, linting, build & deploy instructions
Local env

Provide .env.local.example:

NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_APP_NAME=HiringAgentManager
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

Scripts (frontend package.json)

dev → next dev

build → next build

start → next start

lint → eslint . --ext .ts,.tsx

test → jest

e2e → playwright test

CI/CD

Use GitHub Actions:

Lint + test on PR

Build + deploy to Vercel (frontend) and backend to chosen host (Heroku / Render / Supabase Edge Functions)

Environment secrets stored in GitHub.