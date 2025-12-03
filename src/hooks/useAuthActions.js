import { clearUserInfo, logInState } from '@store/slice';
import {
  localStorageUtils,
  USER_INFO_KEY,
  useSupabaseAuth,
} from '@supabase_path';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useAuthActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const supabaseAuth = useSupabaseAuth();
  const { removeItemFromLocalStorage } = localStorageUtils();

  const login = () => navigate('/login');
  const signup = () => navigate('/signup');
  const mypage = () => navigate('/mypage');

  const logout = async () => {
    try {
      await supabaseAuth.logout();
      dispatch(logInState(false));
      removeItemFromLocalStorage(USER_INFO_KEY.customKey); //로그아웃 시 로컬스토리지 모두 제거
      dispatch(clearUserInfo()); //로그아웃시 userinfo 클리어
      toast.success('로그아웃 되었습니다.');
      navigate('/');
    } catch (error) {
      toast.error('로그아웃 중 오류가 발생하였습니다.');
      console.error('로그아웃 실패 : ', error);
    }
  };

  return { login, signup, logout, mypage };
};
