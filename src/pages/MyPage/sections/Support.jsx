import { useSelector } from "react-redux";
import "./Support.scss";

export default function Support() {
  const isDarkMode = useSelector((state) => state.themeToggle.isDarkMode);
  return (
    <div className={`section-box ${isDarkMode ? "dark" : "light"}`}>
      <h2>고객센터</h2>
      <p>문의사항이 있으시면 jeonwb622@gmail.com 으로 연락 주세요.</p>
    </div>
  );
}
