import { movieApi } from '@apis';
import { useEffect, useState } from 'react';

export default function useMovieDetailInfo(movieId) {
  const [movieDetailInfo, setMovieDetailInfo] = useState(null); //movieListDatas.results
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      if (!movieId) return;

      try {
        setLoading(true);

        const jsonData = await movieApi.getMovieDetail(movieId);

        setMovieDetailInfo(jsonData);
      } catch (error) {
        console.error('API 요청 에러 : ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieInfo();
  }, [movieId]);

  return { movieDetailInfo, loading };
}
