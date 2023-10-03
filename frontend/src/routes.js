import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import TutorUpdatePage from './pages/TutorUpdatePage';
import UserInfoPage from './pages/UserInfoPage';
import LoginPage from './pages/LoginPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/update',
      element: <TutorUpdatePage />,
      children: [
        { element: <Navigate to="dashboard/app" />, index: true }
      ],
    },
    {
      path: '/login',
      element: <LoginPage />,
      children: [
        { element: <Navigate to="dashboard/app" />, index: true }
      ]
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        {
          path: 'tutee/:id', // /dashboard/user/:id
          element: <UserInfoPage />
        },
      ],
    },
    {
      element: <SimpleLayout />, // this is the layout before DashboardLayout loads
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
