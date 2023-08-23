import { lazy, Suspense } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { AuthProvider } from '../contexts/AuthContexts';

import { Navber } from '../components/Navber';

const Error = lazy(() => import('../pages/Error'));
const Home = lazy(() => import('../pages/Home'));
const Map = lazy(() => import('../pages/Map'));
const User = lazy(() => import('../pages/User'));

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
              <Route path="/app/user" element={<User />} />
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Suspense>
    </BrowserRouter>
  );
};
