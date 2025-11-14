-- Schema for hiring-agent-backend (PostgreSQL / Supabase)
create extension if not exists "uuid-ossp";

create type user_role as enum ('Admin','Recruiter','Applicant');
create type job_status as enum ('open','closed','draft');
create type workflow_status as enum ('queued','running','succeeded','failed');

create table if not exists public.users (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  password_hash text not null,
  full_name text,
  role user_role not null default 'Applicant',
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.jobs (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  status job_status not null default 'open',
  created_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.agents (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  type text not null,
  config jsonb not null default '{}'::jsonb,
  created_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.workflow_logs (
  id bigserial primary key,
  job_id uuid references public.jobs(id) on delete set null,
  agent_id uuid references public.agents(id) on delete set null,
  user_id uuid references public.users(id) on delete set null,
  event text not null,
  status workflow_status not null default 'queued',
  input_payload jsonb default '{}'::jsonb,
  output_payload jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create index if not exists idx_jobs_status on public.jobs(status);
create index if not exists idx_agents_type on public.agents(type);
create index if not exists idx_logs_job on public.workflow_logs(job_id);
create index if not exists idx_logs_agent on public.workflow_logs(agent_id);
create index if not exists idx_logs_user on public.workflow_logs(user_id);
create index if not exists idx_logs_created_at on public.workflow_logs(created_at desc);

-- Ensure updated_at exists when applying to existing DBs
alter table if exists public.users add column if not exists updated_at timestamptz;
alter table if exists public.agents add column if not exists updated_at timestamptz;
alter table if exists public.workflow_logs add column if not exists updated_at timestamptz;

-- Generic updated_at trigger function
create or replace function public.tg_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Attach updated_at triggers
drop trigger if exists set_updated_at_users on public.users;
create trigger set_updated_at_users
before update on public.users
for each row execute function public.tg_set_updated_at();

drop trigger if exists set_updated_at_agents on public.agents;
create trigger set_updated_at_agents
before update on public.agents
for each row execute function public.tg_set_updated_at();

drop trigger if exists set_updated_at_workflow_logs on public.workflow_logs;
create trigger set_updated_at_workflow_logs
before update on public.workflow_logs
for each row execute function public.tg_set_updated_at();

-- Validate workflow_logs status transitions
create or replace function public.workflow_logs_status_guard()
returns trigger as $$
begin
  if tg_op = 'UPDATE' then
    if new.status is distinct from old.status then
      if old.status = 'queued' and new.status in ('running','failed') then
        null; -- allowed
      elsif old.status = 'running' and new.status in ('succeeded','failed') then
        null; -- allowed
      elsif old.status in ('succeeded','failed') and new.status <> old.status then
        raise exception 'Cannot transition from % to %', old.status, new.status;
      else
        raise exception 'Invalid workflow_logs status transition from % to %', old.status, new.status;
      end if;
    end if;
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists workflow_logs_status_guard_trg on public.workflow_logs;
create trigger workflow_logs_status_guard_trg
before update on public.workflow_logs
for each row execute function public.workflow_logs_status_guard();
