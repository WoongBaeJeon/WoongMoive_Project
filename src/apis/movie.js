//커스텀 진행 예정
import fetcher from '@lib/fetcher';

const movieApi = {
  getPopularMovies: async () => {
    const response = await fetcher.get(`/popular&language=ko&page=1`);
    return response;
  },
  getTopRatedMovies: async () => {
    const response = await fetcher.get(`/top_rated&language=ko&page=1`);
    return response;
  },
  getMovieDetail: async (movieId) => {
    const response = await fetcher.get(`/movie/${movieId}&language=ko`);
    return response;
  },
};

export default movieApi;
