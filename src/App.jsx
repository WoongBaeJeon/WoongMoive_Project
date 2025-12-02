import "./styles/index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { store } from "@store/index.js";
import { Provider } from "react-redux";
import { Layout, LoadingSkeleton } from "@components";
import { SupabaseProvider } from "@supabase_path";
import {
  MovieMain,
  LoginPage,
  SignUpPage,
  AuthCallback,
  MyPage,
  MyInfo,
  MyWishlist,
  Support,
} from "@pages";

const MovieDetail = lazy(() => import("@pages/MovieDetail.jsx"));

//라우팅 역할을 하는 App
export default function App() {
  return (
    <SupabaseProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<LoadingSkeleton />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<MovieMain />} />
                <Route path="/detail/:movieId" element={<MovieDetail />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="mypage" element={<MyPage />}>
                  <Route index element={<MyInfo />} />
                  <Route path="wishlist" element={<MyWishlist />} />
                  <Route path="support" element={<Support />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </SupabaseProvider>
  );
}
