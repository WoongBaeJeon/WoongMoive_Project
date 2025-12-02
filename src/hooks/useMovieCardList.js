import { API_KEY, API_URL } from '@constants/api.js';
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

      const endPoint = `${API_URL}/popular?api_key=${API_KEY}&language=ko&page=${pageValue}`;
      const response = await fetch(endPoint);

      if (!response.ok) {
        throw new Error(`API 응답 에러: ${response.status}`);
      }

      const jsonData = await response.json();
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
      console.error('API 요청 에러 : ', error);
      setError(error);
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
