import { NavLink } from 'react-router-dom';
import './SideMenu.scss';

export default function SideMenu({ userInfo }) {
  return (
    <aside className="mypage-sidebar">
      <div className="user-section">
        <div className="user-avatar">
          <img src={userInfo.profileImageUrl} alt="user-avatar" />
        </div>
        <p className="user-name">{userInfo.name} 님</p>
      </div>

      <ul className="sidebar-menu">
        <li>
          <NavLink to="/mypage" end>
            회원정보
          </NavLink>
        </li>
        <li>
          <NavLink to="/mypage/wishlist">위시리스트</NavLink>
        </li>
        <li>
          <NavLink to="/mypage/support">고객센터</NavLink>
        </li>
      </ul>
    </aside>
  );
}
