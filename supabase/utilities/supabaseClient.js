import { supabaseEnv } from "./env";
import { createClient } from "@supabase/supabase-js";
// supabase 로그인 유지 세션 생성
export const supabaseClient = createClient(
  supabaseEnv.projectURL,
  supabaseEnv.apiKey
);
