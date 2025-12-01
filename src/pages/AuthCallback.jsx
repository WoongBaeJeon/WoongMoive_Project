import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "@supabase_path";
import { useEffect } from "react";
import { logInState, setUserName, setUserId } from "@store/slice";
import { localStorageUtils, USER_INFO_KEY } from "@supabase_path/utilities";
import { toast } from "react-toastify";

export default function AuthCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const supabase = useSupabase();
  const { setItemToLocalStorage } = localStorageUtils();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // 1) 세션 확인
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("세션 불러오기 오류:", error);
          navigate("/login");
          return;
        }

        // 2) 세션이 있으면 로그인 완료된 것
        if (data.session?.user) {
          const sessionUser = data.session.user;
          const userName = sessionUser.user_metadata?.name || "";
          const userId = sessionUser.id || "";

          // 3) 로컬 스토리지 및 Redux 상태 업데이트
          setItemToLocalStorage(USER_INFO_KEY.customKey, sessionUser);
          dispatch(logInState(true)); // Redux 로그인 상태 변경
          dispatch(setUserName(userName)); //userName 추가 전역관리
          dispatch(setUserId(userId));
          toast.success(`${userName}님 환영합니다!`);
          navigate("/");
        } else {
          // 세션 없음 → 로그인 실패
          toast.error(`로그인 실패`);
          navigate("/login");
        }
      } catch (error) {
        console.error("OAuth 처리 실패 : ", error);
        toast.error("로그인 중 오류가 발생하였습니다.");
        navigate("/login");
      }
    };

    handleOAuthCallback();
  }, [navigate, dispatch, supabase]);

  return (
    <div style={{ padding: "20px", textAlign: "center", color: "#00bcd4" }}>
      <h2>로그인 처리 중...</h2>
    </div>
  );
}
