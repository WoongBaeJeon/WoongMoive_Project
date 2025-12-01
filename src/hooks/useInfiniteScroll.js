import { useEffect } from "react";
//IntersectionObserver 인터잭션옵저버사용
export default function useInfiniteScroll({
  sentinelRef,
  loading,
  hasMore,
  addMovie,
  observeCondition = true,
}) {
  useEffect(() => {
    if (!observeCondition) return;
    if (!sentinelRef.current) return;

    // 브라우저에 IntersectionObserver 지원되는지 확인
    if (typeof IntersectionObserver === "undefined") {
      console.warn("IntersectionObserver가 지원되지 않는 환경입니다.");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // 로딩 중이거나 더 이상 불러올게 없으면 호출하지 않음
          if (loading) return;
          if (!hasMore) {
            // 더 불러올 데이터가 없으면 observer 연결 해제
            observer.disconnect();
            return;
          }
          addMovie();
        }
      },
      {
        root: null, // 뷰포트 기준
        rootMargin: "50px", // 미리 불러오기: sentinel이 화면으로부터 50px 이내로 들어오면 트리거
        threshold: 1, // sentinel이 0: 조금이라도 보이면, 1: 완전히 보이면 트리거
      }
    );

    observer.observe(sentinelRef.current); //리스트 맨 아래 있는 빈 div(sentinel)를 ‘감시’ 시작.

    // cleanup //컴포넌트가 언마운트되거나
    return () => {
      observer.disconnect();
    }; // addMovie, loading, hasMore 등이 변경될 때 이전 옵저버 제거 → 메모리 누수/중복 observe 방지
  }, [observeCondition, loading, hasMore, addMovie, sentinelRef]);
}
