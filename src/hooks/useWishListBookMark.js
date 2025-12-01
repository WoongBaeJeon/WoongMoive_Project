import { useCallback, useEffect, useRef, useState } from "react";
import { supabaseClient } from "@supabase_path/utilities";

export const useWishListBookMark = (userId) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMountedRef = useRef(true);

  const fetchBookmarks = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);

      const { data, error } = await supabaseClient
        .from("bookmarks")
        .select("*")
        .eq("user_id", userId)
        .order("id", { ascending: false });

      if (error) {
        throw error;
      }

      if (isMountedRef.current) {
        setBookmarks(data);
      }
    } catch (error) {
      console.error("위시리스트 에러:", error);
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [userId]);

  useEffect(() => {
    fetchBookmarks();
    return () => {
      isMountedRef.current = false;
    };
  }, [fetchBookmarks]);

  return { bookmarks, loading, refetch: fetchBookmarks };
};
