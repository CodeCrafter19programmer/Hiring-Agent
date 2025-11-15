# Hiring Agent Manager — System Architecture

## Core Principle: Internal Staff-Only System

⚠️ **IMPORTANT**: This is **NOT** a public-facing job board or applicant portal.  
This is an **internal company tool** for HR staff (Admin & Recruiter roles only).

## User Roles

The system supports **ONLY TWO ROLES**:

### 1. Admin
- Full system control
- Create and manage recruiter accounts
- Create jobs and manage all data
- Configure AI agents and workflows
- View complete analytics dashboard
- Access user management page

### 2. Recruiter
- Create jobs
- Upload candidate CVs manually
- Trigger AI agents and workflows
- View candidate evaluation results
- Access dashboard and analytics

### ❌ NO Applicant/Candidate Role
- **Candidates DO NOT have accounts**
- **Candidates DO NOT log in**
- **Candidates DO NOT interact with the system**
- CVs are uploaded by recruiters or fetched via integrations (Google Sheets, Gmail, etc.)

---

## System Modules

### Dashboard (`/`)
Internal analytics overview showing:
- Total jobs posted
- Active AI agents
- Running workflows
- Candidate statistics
- Available to both Admin and Recruiter

### Jobs Module (`/jobs`, `/jobs/new`, `/jobs/[id]`)
- Create and manage job listings (internal only)
- View associated candidates for each job
- **NO** public job posting
- **NO** application forms

### Candidates Module (`/candidates`, `/candidates/[id]`)
- Internal candidate database
- Candidate data sources:
  - Manual CV uploads by recruiters
  - Google Sheets integration
  - Gmail integration (future)
- Displays:
  - Name, email, phone
  - CV/resume text
  - AI-extracted skills
  - Fit score (based on job requirements)
  - Status (Shortlisted / Rejected / Pending Review)
- **NO** candidate self-registration
- **NO** candidate login or profile editing

### Agents Module (`/agents`, `/agents/new`, `/agents/[id]`)
AI automation agents for:
- CV screening
- Candidate scoring
- Skills extraction
- Job-candidate matching
- Each agent has configurable JSON settings
- Agent types: Screening, Evaluation, Scoring

### Workflows Module (`/workflows`, `/workflows/logs/[id]`)
Automated sequences combining multiple agents:
- Example: Screen → Score → Update database
- Trigger workflows manually via UI
- Select job and agent IDs
- View workflow execution history

### Settings Module (`/settings`)
Internal configuration:
- API keys (OpenAI, etc.)
- Google Sheets integration credentials
- Default AI model selection
- System logging preferences

### Users Module (`/users`) — Admin Only
- Create recruiter accounts
- Manage existing users
- **Only accessible to Admin role**

### Profile Page (`/profile`)
- View current user information
- Available to Admin and Recruiter

---

## Authentication

### Login (`/login`)
- Email and password authentication
- Role is determined by database (Admin or Recruiter)
- Protected routes enforce authentication

### Registration (`/register`)
- **Only for internal staff**
- Role options: Admin or Recruiter **only**
- **NO** Applicant registration option

---

## Data Flow

1. **CVs Arrive Externally**
   - Recruiters upload files via UI
   - Google Sheets integration imports data
   - (Future) Gmail integration parses email attachments

2. **Recruiter/Admin Triggers Workflow**
   - Select workflow and job
   - AI agents process CVs:
     - Extract text from PDF/Word
     - Parse skills and experience
     - Generate fit score
     - Match against job requirements

3. **Candidate Database Updates**
   - Name, contact info
   - Extracted skills
   - Fit score (%)
   - Status flag

4. **Admin/Recruiter Reviews Results**
   - View candidate table with scores
   - Filter by status
   - Make hiring decisions

---

## What This System Is NOT

❌ **Public job board** — Jobs are internal-only  
❌ **Applicant portal** — No candidate accounts or dashboards  
❌ **Application form system** — CVs come from uploads or integrations  
❌ **Messaging platform** — No chat between candidates and recruiters  
❌ **Candidate-facing UI** — Entire frontend is staff-only  

---

## Technology Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS + Glassmorphism UI
- React Query for data fetching
- Lucide React icons

### Backend
- Python FastAPI (API endpoints)
- PostgreSQL (database)
- OpenAI API (LLM integrations)
- Google Sheets API (optional integration)

---

## Development Notes

- All pages under `/app` are protected with `<ProtectedRoute>`
- `AppLayout` component manages responsive sidebar/topbar
- Sidebar shows "Users" link only for Admin role
- Mobile-responsive with hamburger menu toggle
- Glassmorphism design system (black/white, translucent backgrounds)
