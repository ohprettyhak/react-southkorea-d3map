import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from 'react-router-dom';

import { Gate, GeoJSON, TopoJSON } from './pages';

const App = () => {
  const router = createBrowserRouter(
    [
      {
        element: (
          <>
            <ScrollRestoration />
            <Outlet />
          </>
        ),
        children: [
          { path: '/', element: <Gate /> },
          { path: '/GeoJSON', element: <GeoJSON /> },
          { path: '/TopoJSON', element: <TopoJSON /> },
          { path: '*', element: <Navigate to="/" replace /> },
        ],
      },
    ],
    { basename: import.meta.env.BASE_URL },
  );
  return <RouterProvider router={router} />;
};

export default App;
