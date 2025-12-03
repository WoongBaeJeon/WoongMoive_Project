import { useMovieBookMark } from '@hooks/useMovieBookMark';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './MovieBookMarkButton.scss';

export default function MovieBookMarkButton({ movieInfo, userId, refetch }) {
  const isDarkMode = useSelector((state) => state.themeToggle.isDarkMode);
  const { isBookMarked, toggleBookmark } = useMovieBookMark(
    userId,
    movieInfo,
    refetch,
  );

  const handleClick = (e) => {
    e.stopPropagation();

    if (!userId) {
      toast.warning('로그인이 필요한 기능입니다.');
      return;
    }

    toggleBookmark();
  };

  return (
    <div className={`bookMark-icons ${isDarkMode ? 'dark' : 'light'}`}>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
        className="bookMark-icons-btn"
        style={{ border: 'none' }}
      >
        {isBookMarked ? '★' : '☆'}
      </button>
    </div>
  );
}
