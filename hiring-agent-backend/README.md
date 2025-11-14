# hiring-agent-backend

Node.js + Express backend using Supabase (PostgreSQL), JWT auth, and modular routing.

## Setup

1. Copy `.env.example` to `.env` and fill values.
2. Create database tables by running `supabase.sql` in your Supabase project's SQL editor.
3. Install deps:

```
npm install
```

4. Start dev server:

```
npm run dev
```

## API Base

`/api`

Auth: Bearer token from `/api/auth/login` or `/api/auth/register`.
