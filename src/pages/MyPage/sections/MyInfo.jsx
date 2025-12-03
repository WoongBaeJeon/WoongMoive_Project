import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import './MyInfo.scss';

export default function MyInfo() {
  const { userInfo } = useOutletContext();
  const isDarkMode = useSelector((state) => state.themeToggle.isDarkMode);
  return (
    <div className={`section-box ${isDarkMode ? 'dark' : 'light'}`}>
      <h2>회원정보</h2>
      <div className="info-box">
        <p>
          <strong>이메일 :</strong> {userInfo.email}
        </p>
        <p>
          <strong>이름 :</strong> {userInfo.name}
        </p>
      </div>
    </div>
  );
}
