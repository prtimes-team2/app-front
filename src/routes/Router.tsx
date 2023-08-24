import { lazy, Suspense } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { AuthProvider } from '../contexts/AuthContexts';

import { Navber } from '../components/Navber';

const Error = lazy(() => import('../pages/Error'));
const Home = lazy(() => import('../pages/Home'));
const Detail = lazy(() => import('../pages/Detail'));
const Map = lazy(() => import('../pages/Map'));
const Search = lazy(() => import('../pages/Search'));
const User = lazy(() => import('../pages/User'));
const Register = lazy(() => import('../pages/Register'));

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <AuthProvider>
          <Routes>
            <Route
              path="/app"
              element={
                <>
                  <Outlet />
                  <Navber />
                </>
              }
            >
              <Route path="/app/map" element={<Map />} />
              <Route path="/app/home" element={<Home />} />
              <Route path="/app/home/detail/:id" element={<Detail />} />
              <Route path="/app/search" element={<Search />} />
              <Route path="/app/user" element={<User />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </AuthProvider>
      </Suspense>
    </BrowserRouter>
  );
};
