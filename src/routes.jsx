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
const User = Loadable(lazy(() => import('./pages/User')));
const Album = Loadable(lazy(() => import('./pages/Album')));
const AlbumPhoto = Loadable(lazy(() => import('./pages/AlbumPhoto')));
const NotFound = Loadable(lazy(() => import('./pages/NotFound')));

const routes = [
  {
    path: '/',
    element: <LandingPage />,
    index: true,
  },
  {
    path: '/users',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/users/:id',
    element: (
      <ProtectedRoute>
        <User />
      </ProtectedRoute>
    ),
  },
  {
    path: '/users/:id/albums/:albumId',
    element: (
      <ProtectedRoute>
        <Album />
      </ProtectedRoute>
    ),
  },
  {
    path: '/users/:id/albums/:albumId/photo/:photoId',
    element: (
      <ProtectedRoute>
        <AlbumPhoto />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
