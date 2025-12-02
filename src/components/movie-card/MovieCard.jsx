import { BASE_URL } from '@constants/api.js';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MovieBookMarkButton from './MovieBookMarkButton';
import './MovieCard.scss';

function MovieCard({ data, refetch }) {
  const isDarkMode = useSelector((state) => state.themeToggle.isDarkMode);
  const userId = useSelector((state) => state.logIn.userId);

  return (
    <div className={`MovieCard-Container ${isDarkMode ? 'dark' : 'light'}`}>
      <Link to={`/detail/${data.id}`}>
        <p className="MovieCard-Image">
          <img src={`${BASE_URL}${data.poster_path}`} alt={`${data.title}`} />
        </p>
      </Link>
      <p className="title">{data.title}</p>
      <span className="vote-bookMark">
        <p className="vote_average">평점 : {data.vote_average}</p>
        {userId && (
          <MovieBookMarkButton
            movieInfo={data}
            userId={userId}
            refetch={refetch}
          />
        )}
      </span>
    </div>
  );
}
export default MovieCard;
