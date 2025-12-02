import { useAuthGuard } from "@hooks/useAuthGuard";
import SideMenu from "./components/SideMenu";
import { Outlet } from "react-router-dom";
import { useUserInfo } from "@hooks";
import { LoadingSkeleton } from "@components";
import { useSelector } from "react-redux";
import "./MyPage.scss";

export default function MyPage() {
  const isDarkMode = useSelector((state) => state.themeToggle.isDarkMode);
  const { userInfo } = useUserInfo();

  useAuthGuard();

  if (!userInfo)
    return (
      <div>
        <LoadingSkeleton
          posterHeight="220px"
          titleWidth="60%"
          textWidth="80%"
        />
      </div>
    );

  return (
    <div className={`mypage-wrapper ${isDarkMode ? "dark" : "light"}`}>
      <SideMenu userInfo={userInfo} />
      <main className="mypage-content">
        <Outlet context={{ userInfo }} />
      </main>
    </div>
  );
}
