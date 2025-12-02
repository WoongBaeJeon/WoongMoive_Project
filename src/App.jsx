import { Layout, LoadingSkeleton } from '@components';
import {
  AuthCallback,
  LoginPage,
  MovieMain,
  MyInfo,
  MyPage,
  MyWishlist,
  SignUpPage,
  Support,
} from '@pages';
import { store } from '@store/index.js';
import { SupabaseProvider } from '@supabase_path';
import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/index.scss';

const MovieDetail = lazy(() => import('@pages/MovieDetail.jsx'));

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
