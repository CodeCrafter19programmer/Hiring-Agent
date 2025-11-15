# Hiring Agent Frontend – Environment Setup

Use this file to populate `.env.local` for local development or the Environment Variables section when deploying to Vercel.

## Required Variables

```env
NEXT_PUBLIC_API_URL=https://your-backend.example.com/api
```
- Base URL of the Hiring Agent backend API. Update with your deployed backend address (include `/api` suffix).

## Optional Variables

```env
NEXT_PUBLIC_APP_NAME=Hiring Agent Manager
```
- Display name used across the UI. Change if you want to show a different product name.

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```
- Only required if Supabase features are enabled. Leave blank if not using Supabase.

## Setup Instructions

1. **Local development**
   - Copy `.env.local.example` to `.env.local`.
   - Replace the placeholders above with your real values.
2. **Vercel deployment**
   - During the import flow (or later under Project Settings → Environment Variables), add the same keys and values.
   - Redeploy to apply changes.
