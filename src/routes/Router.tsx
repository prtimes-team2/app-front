import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { AuthProvider } from '../contexts/AuthContexts';

const Top = lazy(() => import('../pages/Top'));
const Error = lazy(() => import('../pages/Error'));
const Home = lazy(() => import('../pages/Home'));

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Top />} />
            <Route path="/app/home" element={<Home />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </AuthProvider>
      </Suspense>
    </BrowserRouter>
  );
};
