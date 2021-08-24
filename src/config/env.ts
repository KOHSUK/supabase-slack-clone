export const Env = {
  SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY || '',
} as const;
