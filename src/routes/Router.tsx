import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { AuthProvider } from '../contexts/AuthContexts';

import { Navber } from '../components/Navber';

const Top = lazy(() => import('../pages/Top'));
const Error = lazy(() => import('../pages/Error'));
const Home = lazy(() => import('../pages/Home'));

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
            <Route element={<Top />} />
             <Route path="/home" element={<Home />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
          </AuthProvider>
      </Suspense>
        
    </BrowserRouter>
  );
};
