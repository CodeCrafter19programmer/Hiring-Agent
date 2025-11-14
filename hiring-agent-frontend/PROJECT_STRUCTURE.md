# Complete Project Structure & File Manifest

This document lists ALL files needed for the complete Hiring Agent Manager frontend.

## ✅ Files Already Created

### Configuration & Setup
- ✅ `package.json` - Dependencies and scripts
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `next.config.js` - Next.js configuration
- ✅ `tailwind.config.js` - Tailwind CSS configuration
- ✅ `postcss.config.js` - PostCSS configuration
- ✅ `.gitignore` - Git ignore rules
- ✅ `.env.local.example` - Environment variable template
- ✅ `README.md` - Complete setup and usage documentation

### Core Libraries
- ✅ `lib/config.ts` - App configuration
- ✅ `lib/api.ts` - API client with auth
- ✅ `lib/auth.ts` - Authentication helpers
- ✅ `lib/utils.ts` - Utility functions

### Custom Hooks
- ✅ `hooks/useAuth.ts` - Authentication hook
- ✅ `hooks/useJobs.ts` - Job data fetching
- ✅ `hooks/useAgents.ts` - Agent data fetching
- ✅ `hooks/useWorkflows.ts` - Workflow operations

### App Structure
- ✅ `app/layout.tsx` - Root layout
- ✅ `app/providers.tsx` - React Query & Theme providers
- ✅ `app/globals.css` - Global styles with Tailwind

## 📝 Files To Create

### UI Components (components/ui/)
- `components/ui/Button.tsx` - Primary button component
- `components/ui/Input.tsx` - Form input component
- `components/ui/Card.tsx` - Card container
- `components/ui/Badge.tsx` - Status badges
- `components/ui/Table.tsx` - Data table component
- `components/ui/Modal.tsx` - Modal dialog
- `components/ui/Select.tsx` - Dropdown select
- `components/ui/Textarea.tsx` - Multiline input
- `components/ui/Checkbox.tsx` - Checkbox input
- `components/ui/Spinner.tsx` - Loading spinner

### Layout Components (components/layout/)
- `components/layout/Sidebar.tsx` - Main navigation sidebar
- `components/layout/Topbar.tsx` - Top navigation bar
- `components/layout/ThemeToggle.tsx` - Dark/light mode toggle
- `components/layout/ProtectedRoute.tsx` - Auth wrapper

### Feature Components
- `components/jobs/JobCard.tsx` - Job list item
- `components/jobs/JobForm.tsx` - Create/edit job form
- `components/agents/AgentCard.tsx` - Agent list item
- `components/agents/AgentForm.tsx` - Create/edit agent form
- `components/agents/JsonEditor.tsx` - JSON config editor
- `components/workflows/TriggerModal.tsx` - Workflow trigger UI
- `components/workflows/WorkflowStatus.tsx` - Status indicator
- `components/workflows/LogDetail.tsx` - Log details view
- `components/candidates/CandidateCard.tsx` - Candidate list item
- `components/candidates/CVViewer.tsx` - CV display component

### Pages (app/)
- `app/page.tsx` - Dashboard with KPIs
- `app/login/page.tsx` - Login page
- `app/register/page.tsx` - Registration page
- `app/jobs/page.tsx` - Jobs list
- `app/jobs/new/page.tsx` - Create job
- `app/jobs/[id]/page.tsx` - Job detail
- `app/agents/page.tsx` - Agents list
- `app/agents/new/page.tsx` - Create agent
- `app/agents/[id]/page.tsx` - Agent detail/edit
- `app/workflows/page.tsx` - Workflows & logs
- `app/workflows/logs/[id]/page.tsx` - Log detail
- `app/candidates/page.tsx` - Candidates list
- `app/candidates/[id]/page.tsx` - Candidate detail
- `app/settings/page.tsx` - Settings
- `app/profile/page.tsx` - User profile

### Tests
- `tests/components/LoginForm.test.tsx` - Login form tests
- `tests/components/JobForm.test.tsx` - Job form tests
- `tests/components/WorkflowTrigger.test.tsx` - Workflow tests
- `tests/e2e/auth.spec.ts` - E2E auth tests
- `tests/e2e/jobs.spec.ts` - E2E job tests
- `jest.config.js` - Jest configuration
- `playwright.config.ts` - Playwright configuration

### Additional Files
- `public/favicon.ico` - App icon
- `public/logo.svg` - App logo
- `middleware.ts` - Next.js middleware (optional auth check)

## 🚀 Quick Start After File Creation

1. Install dependencies:
   ```bash
   cd hiring-agent-frontend
   npm install
   ```

2. Set up environment:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your API URL
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Run tests:
   ```bash
   npm test
   npm run e2e
   ```

## 📦 Component Usage Examples

### Button
```tsx
import { Button } from '@/components/ui/Button';
<Button variant="primary" onClick={handleClick}>Click Me</Button>
```

### Modal
```tsx
import { Modal } from '@/components/ui/Modal';
<Modal open={isOpen} onClose={() => setIsOpen(false)} title="Confirm">
  <p>Are you sure?</p>
</Modal>
```

### Job Form
```tsx
import { JobForm } from '@/components/jobs/JobForm';
<JobForm onSubmit={handleSubmit} initialData={job} />
```

## 🎯 Implementation Priority

If implementing incrementally, follow this order:

1. **Phase 1: Auth & Layout**
   - UI components (Button, Input, Card, Modal)
   - Layout components (Sidebar, Topbar, ThemeToggle)
   - Auth pages (Login, Register)
   - Protected route wrapper

2. **Phase 2: Core Features**
   - Dashboard page
   - Jobs pages (list, create, view)
   - Job-specific components

3. **Phase 3: Advanced Features**
   - Agents pages and components
   - Workflows pages and components
   - Candidates pages

4. **Phase 4: Polish**
   - Settings page
   - Profile page
   - Tests
   - Performance optimizations

## 📊 File Statistics

- Total Files: ~60
- TypeScript Files: ~50
- Test Files: ~6
- Config Files: ~8
- Documentation: ~3

## 🔗 Inter-file Dependencies

### Critical Paths
1. `app/layout.tsx` → `app/providers.tsx` → All pages
2. `lib/api.ts` → All hooks → All pages
3. `lib/auth.ts` → `hooks/useAuth.ts` → Protected pages
4. `components/ui/*` → All feature components → All pages

### Data Flow
```
User Action → Page Component → Custom Hook → API Client → Backend
                ↓                  ↓
         UI Component ← React Query Cache
```

## 💡 Notes for Implementation

- All TypeScript errors will resolve after `npm install`
- Components use Tailwind CSS classes
- Dark mode uses `dark:` prefix
- Forms use React Hook Form + Zod
- API calls use TanStack Query for caching
- Authentication stored in localStorage
- Real-time updates via polling (workflows)

## 🎨 Design Tokens Reference

```typescript
// colors
primary: '#2563EB'
accent: '#06B6D4'
background-light: '#F8FAFC'
background-dark: '#0B1220'

// spacing
4, 8, 12, 16, 24, 32, 48, 64

// radius
card: 8px
button: 6px

// shadows
sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
md: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
```
