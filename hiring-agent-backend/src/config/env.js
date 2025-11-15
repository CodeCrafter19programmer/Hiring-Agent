export const PORT = Number(process.env.PORT || 4000);
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

export const CORS_ALLOWED_ORIGINS = process.env.CORS_ALLOWED_ORIGINS || '';

// Supabase Configuration
export const SUPABASE_URL = process.env.SUPABASE_URL;
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Google Sheets Configuration
export const GOOGLE_SHEETS_SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
export const GOOGLE_SHEETS_JOB_REQUIREMENTS_SHEET = process.env.GOOGLE_SHEETS_JOB_REQUIREMENTS_SHEET || 'Job Requirements';
export const GOOGLE_SHEETS_SCREENED_CANDIDATES_SHEET = process.env.GOOGLE_SHEETS_SCREENED_CANDIDATES_SHEET || 'Screened Candidates';
export const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
export const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

// n8n Configuration
export const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;
export const N8N_HTTP_TRIGGER_URL = process.env.N8N_HTTP_TRIGGER_URL;
