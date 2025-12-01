import { useSelector } from "react-redux";
import { useWishListBookMark } from "@hooks";
import { MovieCard } from "@components";
import "./MyWishlist.scss";

export default function MyWishlist() {
  const userId = useSelector((state) => state.logIn.userId);
  const isDarkMode = useSelector((state) => state.themeToggle.isDarkMode);
  const { bookmarks, loading, refetch } = useWishListBookMark(userId);

  if (!userId) {
    return (
      <div className={`section-box ${isDarkMode ? "dark" : "light"}`}>
        <h2>위시리스트</h2>
        <p>로그인 후 이용해주세요.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`section-box ${isDarkMode ? "dark" : "light"}`}>
        <h2>위시리스트</h2>
        <p>불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className={`section-box ${isDarkMode ? "dark" : "light"}`}>
      <h2>위시리스트🎬</h2>
      {bookmarks.length === 0 ? (
        <p>위시리스트가 비어있습니다.</p>
      ) : (
        <div className="movie-grid">
          {bookmarks.map((bookmark) => (
            <MovieCard
              key={bookmark.id}
              data={{
                title: bookmark.movie_title,
                poster_path: bookmark.movie_img,
                vote_average: bookmark.movie_vote_average,
                is_marked: bookmark.is_marked,
                id: bookmark.movie_id,
                user_id: bookmark.user_id,
              }}
              refetch={refetch}
            />
          ))}
        </div>
      )}
    </div>
  );
}
