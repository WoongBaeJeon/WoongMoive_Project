import { supabaseClient } from "../utilities/supabaseClient";
import SupabaseContext from "../utilities/supabaseContext";

export const SupabaseProvider = ({ children }) => {
  return (
    <SupabaseContext.Provider value={supabaseClient}>
      {children}
    </SupabaseContext.Provider>
  );
};
