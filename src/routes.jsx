import { Suspense, lazy } from 'react';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { GuestGuard } from './components/Auth/GuestGuard';

// eslint-disable-next-line react/display-name
const Loadable = (Component) => (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
);

const LandingPage = Loadable(
  lazy(() => import('./pages/LandingPage/LandingPage'))
);
const Home = Loadable(lazy(() => import('./pages/Home/Home')));
const User = Loadable(lazy(() => import('./pages/User/User')));
const Album = Loadable(lazy(() => import('./pages/Album/Album')));
const AlbumPhoto = Loadable(
  lazy(() => import('./pages/AlbumPhoto/AlbumPhoto'))
);
const NotFound = Loadable(lazy(() => import('./pages/NotFound/NotFound')));

const routes = [
  {
    path: '/',
    element: (
      <GuestGuard>
        <LandingPage />
      </GuestGuard>
    ),
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
