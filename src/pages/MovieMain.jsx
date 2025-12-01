import { useRef } from "react"; //usememo 사용 주석 테스트 주석테스트
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  useMovieCardList,
  useMovieTopRatedList,
  useInfiniteScroll,
} from "@hooks";
import {
  MovieCard,
  MovieSwiper,
  CommonButton,
  LoadingSkeleton,
} from "@components";
import "./MovieMain.scss";

function MovieMain() {
  const movieTopRatedList = useMovieTopRatedList(); //평점이 제일 좋은 영화데이터 가져오기
  const isDarkMode = useSelector((state) => state.themeToggle.isDarkMode);
  const location = useLocation();
  const isAddMoiveBtn = location.pathname.includes("/detail");
  const sentinelRef = useRef(null);
  const { movieList, addMovie, loading, hasMore, filteredMovies, searchText } =
    useMovieCardList(); //인기있는 영화데이터 가져오기

  useInfiniteScroll({
    sentinelRef,
    observeCondition: !isAddMoiveBtn && searchText.length === 0,
    loading,
    hasMore,
    addMovie,
  });

  if (loading && (!movieList || movieList.length === 0)) {
    // 초기 로딩 동안은 스켈레톤 표시
    return (
      <div style={{ minWidth: "1100px" }}>
        <LoadingSkeleton />
      </div>
    );
  }

  if (!movieList.length > 0) {
    return null;
  }

  return (
    <div className={`movieMain-Container ${isDarkMode ? "dark" : "light"}`}>
      <div className="movieMain-movieText">TopRated Movies</div>
      <MovieSwiper movieData={movieTopRatedList} />
      <div className="movieMain-movieText">Populer Movies</div>
      <div className="movieMain-movieCard">
        {filteredMovies?.map((data) => (
          <MovieCard key={data.id} data={data} />
        ))}
      </div>
      {/* 기존 더보기 버튼(호환성 용도/옵션). 디테일 페이지에서는 버튼 대신 무한스크롤이 동작 */}
      <div
        className="addMoiveBtn"
        style={{ textAlign: "center", padding: "16px 0" }}
      >
        {/* 사용자가 무한스크롤을 원치 않거나 IntersectionObserver가 지원되지 않을 때 이 버튼으로도 로드 가능 */}
        {searchText.length > 0 || (
          <CommonButton
            disabled={isAddMoiveBtn || loading || !hasMore}
            onClick={addMovie}
            type="button"
          >
            ▼ 더보기
          </CommonButton>
        )}
      </div>

      {/* sentinel: 검색 중이 아닐 때만 표시 */}
      {/* sentinel: 화면 하단에서 관찰할 빈 요소 */}
      {searchText.length === 0 && (
        <div ref={sentinelRef} style={{ height: "1px" }} aria-hidden="true" />
      )}
      {/* 로딩 인디케이터 */}
      {loading && (
        <div style={{ textAlign: "center", padding: 12 }}>로딩 중...</div>
      )}
      {!hasMore && (
        <div style={{ textAlign: "center", padding: 12 }}>
          더 이상 불러올 영화가 없습니다.
        </div>
      )}
    </div>
  );
}

export default MovieMain;
