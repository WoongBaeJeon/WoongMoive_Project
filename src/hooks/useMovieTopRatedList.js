import { movieApi } from '@apis';
import { useEffect, useState } from 'react';

export default function useMovieTopRatedList() {
  const [movieData, setMoiveData] = useState([]); //movieListDatas.results

  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        const jsonData = await movieApi.getTopRatedMovies();
        const data = jsonData.results.filter((movie) => movie.adult === false);

        if (data.length === 0) {
          throw new Error('영화 데이터를 찾을 수 없습니다.');
        }

        setMoiveData(data);
      } catch (error) {
        console.error('API 요청 에러 : ', error);
      }
    };
    fetchMovieInfo();
  }, []);

  return movieData;
}
