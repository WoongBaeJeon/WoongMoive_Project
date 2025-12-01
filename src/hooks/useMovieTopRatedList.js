import { useEffect, useState } from "react";
import { API_URL, API_KEY } from "@constants/api.js";

export default function useMovieTopRatedList() {
  const [movieData, setMoiveData] = useState([]); //movieListDatas.results

  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        const endPoint = `${API_URL}/top_rated?api_key=${API_KEY}&language=ko&page=1`;
        const response = await fetch(endPoint);
        const jsonData = await response.json();
        const data = jsonData.results.filter((movie) => movie.adult === false);

        if (data.length === 0) {
          throw new Error("영화 데이터를 찾을 수 없습니다.");
        }

        setMoiveData(data);
      } catch (error) {
        console.error("API 요청 에러 : ", error);
      }
    };
    fetchMovieInfo();
  }, []);

  return movieData;
}
