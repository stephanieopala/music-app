import { Suspense, lazy } from 'react';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// eslint-disable-next-line react/display-name
const Loadable = (Component) => (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
);

const LandingPage = Loadable(lazy(() => import('./pages/LandingPage')));
const Home = Loadable(lazy(() => import('./pages/Home')));
const NotFound = Loadable(lazy(() => import('./pages/NotFound')));

const routes = [
  {
    path: '/',
    element: <LandingPage />,
    index: true,
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
