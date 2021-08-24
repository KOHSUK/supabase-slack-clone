import { createClient } from '@supabase/supabase-js';
import { Env } from 'config/env';

const supabaseUrl = Env.SUPABASE_URL;
const supabaseAnonKey = Env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
