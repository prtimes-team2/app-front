import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { Loading } from '../components/Loading';

import { Navber } from '../components/Navber';

const Top = lazy(() => import('../pages/Top'));
const Error = lazy(() => import('../pages/Error'));

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
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
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
