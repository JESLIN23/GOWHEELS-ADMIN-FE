import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ErrorPage from './Pages/ErrorPage/ErrorPage';
import DashboardPage from './Pages/DashboardPage/DashboardPage';
import UserPage from './Pages/UserPage/UserPage';
import CarsPage from './Pages/CarsPage/CarsPage';
import BookingPage from './Pages/BookingPage/BookingPage';
import RootLayout from './components/Layout/RootLayout/RootLayout';
import Offers from './Pages/OffersPage/OffersPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import UserLayout from './components/Layout/UserLayout/UserLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'users', element: <UserPage /> },
      { path: 'cars', element: <CarsPage /> },
      { path: 'booking', element: <BookingPage /> },
      { path: 'offers', element: <Offers /> },
    ],
  },
  {
    path: '/login',
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <LoginPage /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
