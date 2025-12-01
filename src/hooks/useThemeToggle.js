import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeToggleState } from "@store/slice";

export const useThemeToggle = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.themeToggle.isDarkMode);

  const toggleTheme = useCallback(() => {
    dispatch(themeToggleState());
  }, [dispatch]);

  return { isDarkMode, toggleTheme };
};
