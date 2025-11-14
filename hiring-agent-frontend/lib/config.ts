export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Hiring Agent Manager',
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
};
