import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ROUTES } from './const';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import DashboardPage from './Pages/DashboardPage/DashboardPage';
import UserPage from './Pages/UserPage/UserPage';
import CarsPage from './Pages/CarsPage/CarsPage';
import BookingPage from './Pages/BookingPage/BookingPage';
import RootLayout from './components/Layout/RootLayout/RootLayout';
import Offers from './Pages/OffersPage/OffersPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import UserLayout from './components/Layout/UserLayout/UserLayout';
import Unauthorized from './Pages/Unauthorized/Unauthorized';
import UserDetailsPage from './Pages/UserDetails/UserDetails'
import Offline from './Pages/Offline/Offline'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: `${ROUTES.DASHBOARD}`, element: <DashboardPage /> },
      { path: `${ROUTES.USERS}`, element: <UserPage /> },
      { path: `${ROUTES.CARS}`, element: <CarsPage /> },
      { path: `${ROUTES.BOOKING}`, element: <BookingPage /> },
      { path: `${ROUTES.OFFERS}`, element: <Offers /> },
      { path: `${ROUTES.USERDETAILS}`, element: <UserDetailsPage /> },
    ],
  },
  {
    path: '/',
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: `${ROUTES.LOGIN}`, element: <LoginPage /> },
      { path: `${ROUTES.UNAUTHORIZED}`, element: <Unauthorized /> },
      { path: `${ROUTES.OFFLINE}`, element: <Offline /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
