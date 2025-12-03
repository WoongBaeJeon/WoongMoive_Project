import fetcher from '@lib/fetcher';

const movieApi = {
  getPopularMovies: async (page = 1) => {
    const response = await fetcher.get('/popular', {
      language: 'ko',
      page: page,
    });
    return response;
  },

  getTopRatedMovies: async (page = 1) => {
    const response = await fetcher.get('/top_rated', {
      language: 'ko',
      page: page,
    });
    return response;
  },

  getMovieDetail: async (movieId) => {
    const response = await fetcher.get(`/${movieId}`, {
      language: 'ko',
    });
    return response;
  },
};

export default movieApi;
