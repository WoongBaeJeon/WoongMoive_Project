import { useEffect, useState } from "react";
import { API_URL, API_KEY } from "@constants/api.js";

export default function useMovieDetailInfo(movieId) {
  const [movieDetailInfo, setMovieDetailInfo] = useState(null); //movieListDatas.results
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      if (!movieId) return;

      try {
        setLoading(true);

        const endPoint = `${API_URL}/${movieId}?api_key=${API_KEY}&language=ko`;
        const response = await fetch(endPoint);
        const jsonData = await response.json();

        if (!jsonData || jsonData.success === false) {
          throw new Error("영화 데이터를 불러올 수 없습니다.");
        }

        setMovieDetailInfo(jsonData);
      } catch (error) {
        console.error("API 요청 에러 : ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieInfo();
  }, [movieId]);

  return { movieDetailInfo, loading };
}
