import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { USER_INFO_KEY } from '@supabase_path';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    text: '',
  },
  reducers: {
    setSearchText: (state, action) => {
      state.text = action.payload;
    },
  },
});

const themeToggleSlice = createSlice({
  name: 'themeToggle',
  initialState: {
    isDarkMode: false,
  },
  reducers: {
    themeToggleState: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});
const savedUser = localStorage.getItem(USER_INFO_KEY.customKey);
const parsedUser = savedUser ? JSON.parse(savedUser) : null;

const logInSlice = createSlice({
  name: 'logIn',
  initialState: {
    // 초기값 설정이 중요함. 새로고침 시 초기값이 고정될 수 있음.
    isLogIn: !!localStorage.getItem(USER_INFO_KEY.customKey), //!!는 Boolean 타입으로 변환
    userName:
      parsedUser?.user_metadata?.name ||
      parsedUser?.user?.name ||
      parsedUser?.name ||
      null,
    userId:
      parsedUser?.user_metadata?.id ||
      parsedUser?.user?.id ||
      parsedUser?.id ||
      null,
  },
  reducers: {
    logInState: (state, action) => {
      state.isLogIn = action.payload;
    },
    setUserName: (state, action) => {
      //이름 전역관리 추가
      state.userName = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    clearUserInfo: (state) => {
      //이름 전역관리 클리어
      ((state.isLogIn = false), //!!는 Boolean 타입으로 변환!!localStorage.getItem(USER_INFO_KEY.customKey)
        (state.userName = null),
        (state.userId = null));
    },
  },
});

export const { setSearchText } = searchSlice.actions;
export const { themeToggleState } = themeToggleSlice.actions;
export const { logInState, setUserName, setUserId, clearUserInfo } =
  logInSlice.actions;

//컴바인리듀스 사용
const rootReducer = combineReducers({
  search: searchSlice.reducer,
  themeToggle: themeToggleSlice.reducer,
  logIn: logInSlice.reducer,
});

export default rootReducer;
