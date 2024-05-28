import { Suspense, lazy } from 'react';

// eslint-disable-next-line react/display-name
const Loadable = (Component) => (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
);

const LandingPage = Loadable(lazy(() => import('./pages/LandingPage')));
const Home = Loadable(lazy(() => import('./pages/Home')));

const routes = [
  {
    path: '/',
    element: <LandingPage />,
  },

  // authenticated pages
  {
    path: '/home',
    element: <Home />,
  },
];

export default routes;
