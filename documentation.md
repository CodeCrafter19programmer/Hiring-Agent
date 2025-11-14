🧠 STAGE 1 — Backend (Core API + Database)

This is the foundation.
You’ll build it automatically using AI — it sets up routes, controllers, models, and Supabase connection.

🧱 Tech Stack
	•	Node.js + Express.js
	•	Supabase (PostgreSQL + Auth)
	•	TypeScript (optional, better typing for AI builds)
	•	Dotenv for environment management
	•	Axios for external API calls (to the workflow engine later)
	•	Nodemon for local development


🗂️ Folder Structure (AI should generate this)

hiring-agent-backend/
│
├── src/
│   ├── config/
│   │   ├── supabaseClient.js
│   │   └── env.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── agentRoutes.js
│   │   └── workflowRoutes.js
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── jobController.js
│   │   ├── agentController.js
│   │   └── workflowController.js
│   ├── models/
│   │   ├── Job.js
│   │   ├── User.js
│   │   └── Agent.js
│   ├── services/
│   │   ├── aiService.js
│   │   └── workflowService.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── utils/
│   │   └── responseHandler.js
│   ├── index.js
│
├── .env
├── package.json
├── README.md
└── supabase.sql

🧩 DATABASE SCHEMA (Supabase / PostgreSQL)

-- USERS
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  role TEXT CHECK (role IN ('admin', 'recruiter', 'applicant')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- JOBS
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  description TEXT,
  status TEXT DEFAULT 'open',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- AGENTS
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  type TEXT,
  config JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- WORKFLOW LOGS
CREATE TABLE workflow_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id),
  agent_id UUID REFERENCES agents(id),
  status TEXT,
  result JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);