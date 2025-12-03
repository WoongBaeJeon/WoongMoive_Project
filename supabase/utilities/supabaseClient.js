import { createClient } from '@supabase/supabase-js';
import { supabaseEnv } from './env';

export const supabaseClient = createClient(
  supabaseEnv.projectURL,
  supabaseEnv.apiKey,
);
