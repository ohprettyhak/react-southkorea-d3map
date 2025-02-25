import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from 'react-router-dom';

import { Gate, GeoJSON, TopoJSON } from './pages';

const App = () => {
  const router = createBrowserRouter([
    {
      element: (
        <>
          <ScrollRestoration />
          <Outlet />
        </>
      ),
      children: [
        {
          path: '/',
          element: <Gate />,
        },
        {
          path: '/GeoJSON',
          element: <GeoJSON />,
        },
        {
          path: '/TopoJSON',
          element: <TopoJSON />,
        },
        {
          path: '*',
          element: <Navigate to="/" replace />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
