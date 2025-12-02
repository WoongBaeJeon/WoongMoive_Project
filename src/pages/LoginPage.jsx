import googleLogo from '@assets/icons/Google_icon.png';
import kakaoLogo from '@assets/icons/Kakao_icon.png';
import { CommonButton, InputField, OAuthButton } from '@components';
import { useLoginController } from '@hooks/useLoginController';
import { useOAuth } from '@supabase_path/auth/useOauth.auth';
import { useNavigate } from 'react-router-dom';
import './LoginPage.scss';

export default function LoginPage() {
  const { form, errors, authError, loading, handleChange, handleLogin } =
    useLoginController();
  const { loginWithKakao, loginWithGoogle } = useOAuth();
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h2 className="login-title">로그인</h2>
      <div className="oauth-section">
        <OAuthButton
          logo={kakaoLogo}
          children="카카오로 계속하기"
          className="kakao-btn"
          onClick={loginWithKakao}
          label="카카오로 계속하기"
        />

        <OAuthButton
          logo={googleLogo}
          children="Google로 계속하기"
          className="google-btn"
          onClick={loginWithGoogle}
          label="Google로 계속하기"
        />
      </div>
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <span className="divider">또는</span>
        <InputField
          label="이메일"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <InputField
          label="패스워드"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        {authError && <p className="auth-error">{authError}</p>}

        <div className="btn-container">
          <CommonButton
            type="submit"
            className="loginPage-btn"
            aria-label="로그인 데이터 보내기"
          >
            {loading ? '로그인 중...' : '로그인'}
          </CommonButton>
          <CommonButton
            className="loginPage-btn"
            onClick={() => navigate('/signup')}
            type="button"
            aria-label="회원가입 정보 보내기"
          >
            회원가입
          </CommonButton>
        </div>
      </form>
    </div>
  );
}
