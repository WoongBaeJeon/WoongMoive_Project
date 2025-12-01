import { useEffect, useState } from "react";
import { supabaseClient } from "@supabase_path/utilities";

export function useMovieBookMark(userId, movieInfo, refetch) {
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [bookMarkId, setBookMarkId] = useState(null);

  // 초기 로딩
  useEffect(() => {
    if (!userId || !movieInfo.id) return;

    const fetchData = async () => {
      try {
        const { data, error } = await supabaseClient
          .from("bookmarks")
          .select("*")
          .eq("user_id", userId)
          .eq("movie_id", movieInfo.id)
          .maybeSingle();

        if (error) {
          console.error("테이블 조회 에러:", error.message);
          throw error;
        }

        if (data) {
          setIsBookMarked(data.is_marked === true);
          setBookMarkId(data.id);
        } else {
          setIsBookMarked(movieInfo.is_marked || false);
          setBookMarkId(null);
        }
      } catch (error) {
        console.error("북마크 데이터 가져오기 실패:", error);
        setIsBookMarked(false);
        setBookMarkId(null);
      }
    };
    fetchData();
  }, [movieInfo.id, userId, movieInfo.is_marked]);

  // 추가
  const addBookmark = async () => {
    const { data, error } = await supabaseClient
      .from("bookmarks")
      .insert({
        user_id: userId,
        movie_id: movieInfo.id,
        movie_title: movieInfo.title,
        movie_img: movieInfo.poster_path,
        movie_vote_average: movieInfo.vote_average,
        is_marked: true,
      })
      .select();

    if (error) {
      console.error("Insert error:", error);
      return;
    }

    setIsBookMarked(true);
    setBookMarkId(data[0].id);
  };

  // 삭제
  const removeBookmark = async () => {
    console.log("Removing bookmark with ID:", movieInfo.id, userId);
    const { error } = await supabaseClient
      .from("bookmarks")
      .delete()
      .eq("user_id", userId)
      .eq("movie_id", movieInfo.id);
    // .eq("id", bookMarkId);

    if (error) {
      console.error("Delete error:", error);
      return;
    }

    setIsBookMarked(false);
    setBookMarkId(null);

    if (refetch) refetch();
  };

  // 클릭 핸들링
  const toggleBookmark = () => {
    if (bookMarkId) removeBookmark();
    else addBookmark();
  };

  return {
    isBookMarked,
    toggleBookmark,
  };
}
