# Hiring Agent Manager - Frontend

A modern Next.js TypeScript frontend for the Hiring Agent Manager platform, featuring AI-powered recruitment automation with a clean, responsive UI.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/CodeCrafter19programmer/Hiring-Agent&root-directory=hiring-agent-frontend&project-name=hiring-agent-frontend&repository-name=Hiring-Agent&env=NEXT_PUBLIC_API_URL,NEXT_PUBLIC_APP_NAME,NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY&envDescription=Set%20your%20API%20URL%20and%20optional%20Supabase%20keys.&envLink=https://github.com/CodeCrafter19programmer/Hiring-Agent/tree/main/hiring-agent-frontend#-environment-variables)

## 🚀 Features

- **Authentication**: Secure JWT-based login/register with role-based access
- **Job Management**: Create, edit, and manage job postings with agent assignment
- **Agent Configuration**: Define and configure AI agents for screening, analysis, and notifications
- **Workflow Orchestration**: Trigger and monitor automated recruitment workflows
- **Candidate Management**: View parsed CVs, AI evaluations, and candidate recommendations
- **Real-time Updates**: Automatic polling for workflow status changes
- **Dark/Light Theme**: Full theme support with system preference detection
- **Responsive Design**: Mobile-first design that works on all devices
- **Type-Safe**: Full TypeScript coverage with strict mode enabled

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Running backend API (see `hiring-agent-backend`)

## 🛠️ Installation

1. **Clone and navigate to the project**:
   ```bash
   cd hiring-agent-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000/api
   NEXT_PUBLIC_APP_NAME=Hiring Agent Manager
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
hiring-agent-frontend/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Dashboard (home)
│   ├── login/               # Authentication pages
│   ├── jobs/                # Job management
│   ├── agents/              # Agent configuration
│   ├── workflows/           # Workflow triggers & logs
│   ├── candidates/          # Candidate results
│   ├── settings/            # Application settings
│   └── profile/             # User profile
├── components/              # Reusable React components
│   ├── ui/                  # Base UI primitives
│   ├── layout/              # Layout components (Sidebar, Topbar)
│   ├── jobs/                # Job-specific components
│   ├── agents/              # Agent-specific components
│   └── workflows/           # Workflow components
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts          # Authentication hook
│   ├── useJobs.ts          # Job data fetching
│   ├── useAgents.ts        # Agent data fetching
│   └── useWorkflows.ts     # Workflow operations
├── lib/                     # Utility libraries
│   ├── api.ts              # API client with auth
│   ├── auth.ts             # Authentication helpers
│   ├── config.ts           # App configuration
│   └── utils.ts            # Utility functions
├── tests/                   # Test files
│   ├── components/         # Component tests
│   └── e2e/                # End-to-end tests
└── public/                  # Static assets
```

## 🔑 Key Technologies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Testing**: Jest + React Testing Library + Playwright

## 🎨 Design System

### Colors
- **Primary**: #2563EB (Blue)
- **Accent**: #06B6D4 (Teal)
- **Background (Light)**: #F8FAFC
- **Background (Dark)**: #0B1220

### Typography
- **Font**: Inter (Google Fonts)
- **Sizes**: Tailwind's default scale

### Components
All UI components follow consistent patterns:
- 8px border radius for cards
- 6px border radius for buttons
- Consistent spacing using Tailwind's scale
- Accessible color contrast (4.5:1 minimum)

## 🔐 Authentication Flow

1. User visits protected route
2. `useAuth` hook checks for token in localStorage
3. If no token, redirects to `/login`
4. On login success, token stored and user redirected to dashboard
5. API client automatically adds `Authorization: Bearer <token>` header
6. On 401 response, user logged out and redirected to login

## 📡 API Integration

The frontend connects to the Express backend via the API client (`lib/api.ts`):

### Endpoints Used
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `GET /api/jobs` - List jobs
- `POST /api/jobs` - Create job
- `GET /api/agents` - List agents
- `POST /api/workflows/trigger` - Start workflow
- `GET /api/workflows/logs` - View workflow logs
- `GET /api/candidates` - List candidates

All endpoints return JSON with structure:
```typescript
{
  data?: T,
  error?: { message: string, code?: string },
  meta?: { total: number, page: number }
}
```

## 🔄 Workflow Integration

### Triggering Workflows
1. User selects job and agents on `/workflows` page
2. Frontend calls `POST /api/workflows/trigger`
3. Backend creates log entry and notifies n8n (if configured)
4. Frontend polls `/api/workflows/logs/:id` every 3 seconds
5. Status updates displayed in real-time

### n8n Connection
The backend sends webhooks to n8n with:
```json
{
  "log_id": 12345,
  "job_id": "uuid",
  "agent_ids": ["uuid"],
  "input_payload": {}
}
```

n8n processes and returns results to `POST /api/workflows/webhook`.

## 🧪 Testing

### Unit Tests
```bash
npm test
```

Tests cover:
- Component rendering
- Form validation
- API client error handling
- Authentication flows

### E2E Tests
```bash
npm run e2e
```

Playwright tests include:
- Login flow
- Job creation
- Workflow triggering
- Navigation

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual Build
```bash
npm run build
npm start
```

## 🔧 Development Tips

### Adding New Pages
1. Create file in `app/` directory
2. Add route to sidebar in `components/layout/Sidebar.tsx`
3. Create corresponding hooks in `hooks/` if needed

### Adding New API Endpoints
1. Add types to relevant hook file
2. Create query/mutation functions
3. Use in components with `useQuery` or `useMutation`

### Styling Guidelines
- Use Tailwind utility classes
- Follow dark mode patterns with `dark:` prefix
- Maintain consistent spacing (4, 8, 12, 16, 24, 32px)
- Use `cn()` utility for conditional classes

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | Yes |
| `NEXT_PUBLIC_APP_NAME` | Application name | No |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | No |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | No |

## 🐛 Troubleshooting

### "Network error or server unavailable"
- Ensure backend is running on correct port
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify CORS is enabled on backend

### "Invalid token" errors
- Clear localStorage and login again
- Check JWT_SECRET matches between frontend/backend
- Verify token hasn't expired (7 day default)

### Styling not working
- Run `npm install` to ensure Tailwind is installed
- Check `tailwind.config.js` paths include your files
- Restart dev server after config changes

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)

## 🤝 Contributing

1. Create feature branch
2. Make changes with tests
3. Run `npm run lint` and `npm test`
4. Submit pull request

## 📄 License

MIT

---

**Note**: This frontend requires the `hiring-agent-backend` to be running. See backend README for setup instructions.
