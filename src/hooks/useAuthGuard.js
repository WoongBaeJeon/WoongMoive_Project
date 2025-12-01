import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useAuthGuard = () => {
  const isLogIn = useSelector((state) => state.logIn.isLogIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogIn) {
      toast.warn("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [isLogIn, navigate]);
};
