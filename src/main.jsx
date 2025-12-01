// 랜더 역할만 하는 main
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@styles/index.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <>
    <App />
    <ToastContainer
      position="top-center"
      autoClose={2000}
      limit={3}
      closeButton
      hideProgressBar={false}
      pauseOnHover={false}
      style={{ color: "black" }}
    />
  </>
);
