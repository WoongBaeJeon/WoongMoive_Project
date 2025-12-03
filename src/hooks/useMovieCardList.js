import { movieApi } from '@apis';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

export default function useMovieCardList() {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [error, setError] = useState(null);
  const searchText = useSelector((state) => state.search.text);

  const fetchMovieInfo = useCallback(async (pageValue) => {
    try {
      setLoading(true);
      setError(null);

      const jsonData = await movieApi.getPopularMovies(pageValue);
      const data = jsonData.results.filter((movie) => movie.adult === false);

      if (typeof jsonData.total_pages === 'number') {
        setTotalPages(jsonData.total_pages);
      }

      setMovieList((prev) => {
        const combined = [...prev, ...data];
        const uniqueMovies = Array.from(
          new Map(combined.map((m) => [m.id, m])).values(),
        );
        return uniqueMovies;
      });
    } catch (error) {
      if (error.response) {
        // 서버가 2xx 외의 상태 코드 응답
        console.error('서버 에러:', error.response.status, error.response.data);
        setError(`서버 에러: ${error.response.status}`);
      } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못함
        console.error('네트워크 에러:', error.request);
        setError('네트워크 연결을 확인해주세요');
      } else {
        // 요청 설정 중 에러
        console.error('요청 에러:', error.message);
        setError('요청 중 오류가 발생했습니다');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovieInfo(page);
  }, [page, fetchMovieInfo]);

  const addMovie = useCallback(() => {
    setPage((prev) => {
      if (totalPages && prev >= totalPages) return prev;
      return prev + 1;
    });
  }, [totalPages]);

  const hasMore = totalPages ? page < totalPages : true;

  const filteredMovies = useMemo(
    () =>
      movieList?.filter((movie) =>
        movie.title.toLowerCase().includes(searchText.toLowerCase()),
      ),
    [movieList, searchText],
  );

  return {
    movieList,
    addMovie,
    loading,
    page,
    hasMore,
    error,
    filteredMovies,
    searchText,
  };
}
