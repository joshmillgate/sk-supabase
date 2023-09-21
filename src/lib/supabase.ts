import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

// Initialize Supabase client
export const supabase = createClient(
    'YOUR_SUPABASE_URL',
    'YOUR_SUPABASE_PUBLIC_KEY'
);