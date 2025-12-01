import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CommonButton } from "@common";
import { useAuthActions, useSearchHandler, useThemeToggle } from "@hooks";
import "./NavBar.scss";
import { useState } from "react";

export default function NavBar() {
  const navigate = useNavigate();
  const isLogIn = useSelector((state) => state.logIn.isLogIn);
  const userName = useSelector((state) => state.logIn.userName);
  const { login, signup, logout, mypage } = useAuthActions();
  const { isDarkMode, toggleTheme } = useThemeToggle();
  const { inputValue, handleInputChange, resetSearch } = useSearchHandler();
  const [openMenu, setOpenMenu] = useState(false);
  const toggleDropdown = () => setOpenMenu((prev) => !prev);
  const closeDropdown = () => setOpenMenu(false);

  const handleLogoClick = () => {
    navigate("/");
    resetSearch();
  };

  return (
    <nav className={`navbar ${isDarkMode ? "dark" : "light"}`}>
      <h1 className="logo" onClick={handleLogoClick}>
        🎬 웅무비
      </h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="영화 제목을 입력하시오"
        />
      </div>
      <div className="loginBtn">
        <CommonButton
          type="button"
          aria-label="모드 변경"
          onClick={toggleTheme}
        >
          {isDarkMode ? "🌙" : "☀️"}
        </CommonButton>
        {isLogIn ? (
          <>
            <div className="profileWrapper">
              {/* 프로필 아이콘 */}
              <CommonButton
                className="userName-btn"
                type="button"
                aria-label="로그인 이름"
                onClick={toggleDropdown}
              >
                {userName}님
              </CommonButton>
              {/* 드롭다운 메뉴 */}
              {openMenu && (
                <div className="dropdownMenu">
                  <div
                    className="menuItem"
                    onClick={() => {
                      closeDropdown();
                      mypage();
                    }}
                  >
                    마이페이지
                  </div>
                  <div
                    className="menuItem"
                    onClick={() => {
                      closeDropdown();
                      logout();
                    }}
                  >
                    로그아웃
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <CommonButton
              type="submit"
              aria-label="로그인 데이터 전송"
              onClick={login}
            >
              로그인
            </CommonButton>
            <CommonButton
              type="submit"
              aria-label="회원가입 데이터 전송"
              onClick={signup}
            >
              회원가입
            </CommonButton>
          </>
        )}

        {/* <button
          className="hamburgerBtn"
          // onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button> */}
      </div>
    </nav>
  );
}
