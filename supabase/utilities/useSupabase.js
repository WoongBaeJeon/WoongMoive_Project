import { useContext } from 'react';
import SupabaseContext from './supabaseContext';
export const useSupabase = () => {
  const supabase = useContext(SupabaseContext);

  if (!supabase) {
    throw new Error('supabase가 초기화 되지 않았습니다.');
  }
  return supabase;
};
