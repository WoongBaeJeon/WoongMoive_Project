import { logInState, setUserId, setUserName } from '@store/slice';
import { useSupabaseAuth } from '@supabase_path';
import { localStorageUtils, USER_INFO_KEY } from '@supabase_path/utilities';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, useInputValidation } from './index.js';

export function useLoginController() {
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const { form, handleChange } = useForm({ email: '', password: '' });
  const { validateLoginForm, isValid } = useInputValidation();
  const { setItemToLocalStorage } = localStorageUtils(); // 로컬스토리지 유틸 사용

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const supabaseAuth = useSupabaseAuth();

  async function handleLogin() {
    const newErrors = validateLoginForm(form);
    setErrors(newErrors);

    if (!isValid(newErrors)) return false;

    try {
      setLoading(true);
      setAuthError('');

      const { user, error } = await supabaseAuth.login({
        email: form.email,
        password: form.password,
      });

      if (error) throw error;

      if (user) {
        const userName = user.name || '';
        const userId = user.id || '';
        setItemToLocalStorage(USER_INFO_KEY.customKey, user);
        dispatch(logInState(true)); // Redux 상태 업데이트
        dispatch(setUserName(userName)); //userName 추가 전역관리user.user_metadata?.name || user.name || ""
        dispatch(setUserId(userId));

        toast.success(`${userName}님 환영합니다!`);
        dispatch(logInState(true));
        navigate('/');
      } else {
        // 세션 없음 → 로그인 실패
        toast.error(`로그인 실패`);
        navigate('/login');
        return false;
      }
      return true;
    } catch (error) {
      if (error.message.includes('Invalid login credentials')) {
        setAuthError('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else if (error.message.includes('User not found')) {
        setAuthError('이메일이 존재하지 않습니다.');
      } else if (error.message.includes('missing email or phone')) {
        setAuthError('이메일을 입력해 주십시오.');
      } else {
        setAuthError('서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
      }

      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    form,
    errors,
    authError,
    loading,
    handleChange,
    handleLogin,
  };
}
