import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import SuperUserLayout from './layouts/superUserLayout'
//
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import TutorUpdatePage from './pages/TutorUpdatePage';
import UserInfoPage from './pages/UserInfoPage';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import SuperUsersUserListPage from './pages/SuperUsersUserListPage';
import SuperUsersTutorListPage from './pages/SuperUsersTutorListPage';
import SuperUsersTuteeListPage from './pages/SuperUsersTuteeListPage';
import AddEditUserPage from './pages/AddEditUserPage';
import AddEditTutorPage from './pages/AddEditTutorPage';
import AddEditTuteePage from './pages/AddEditTuteePage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        {
          path: 'tutee/:id', // /dashboard/user/:id
          element: <UserInfoPage />,
        },
      ],
    },
    {
      path: '/superuser',
      element: <SuperUserLayout />,
      children: [
        { element: <Navigate to="/superuser/users" />, index: true },
        { path: 'users', element: <SuperUsersUserListPage /> },
        { path: 'tutors', element: <SuperUsersTutorListPage /> },
        { path: 'tutees', element: <SuperUsersTuteeListPage /> },
        { path: 'users/addedit', element: <AddEditUserPage /> },
      ],
    },
    {
      path: '/user',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'tutors/addedit', element: <AddEditTutorPage /> },
        { path: 'tutees/addedit', element: <AddEditTuteePage /> },
      ],
    },
    {
      path: '/update',
      element: <TutorUpdatePage />,
    },
    {
      path: '/landingpage',
      element: <LandingPage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />, // this is the layout before DashboardLayout loads
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'update', element: <TutorUpdatePage /> },
        { path: 'landingpage', element: <LandingPage /> },
        { path: 'login', element: <LoginPage /> },
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
