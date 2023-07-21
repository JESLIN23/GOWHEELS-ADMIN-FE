import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ROUTES } from './const';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import DashboardPage from './Pages/DashboardPage/DashboardPage';
import UserPage from './Pages/UserPage/UserPage';
import CarsPage from './Pages/CarsPage/CarsPage';
import BookingPage from './Pages/BookingPage/BookingPage';
import RootLayout from './components/Layout/RootLayout/RootLayout';
import OffersPage from './Pages/OffersPage/OffersPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import OnServicePage from './Pages/CarsOnService/OnServiceCars';
import UserLayout from './components/Layout/UserLayout/UserLayout';
import Unauthorized from './Pages/Unauthorized/Unauthorized';
import UserDetailsPage from './Pages/UserDetails/UserDetails';
import Offline from './Pages/Offline/Offline';
import CarDetailsPage from './Pages/CarDetails/CarDetails';
import CarFormPage from './Pages/CarForm/CarForm';
import OrderDetailsPage from './Pages/OrderDetails/OrderDetails';
import OrderPage from './Pages/Orders/OrdersPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: `${ROUTES.DASHBOARD}`, element: <DashboardPage /> },
      { path: `${ROUTES.USERS}`, element: <UserPage /> },
      { path: `${ROUTES.USER_DETAILS}`, element: <UserDetailsPage /> },
      { path: `${ROUTES.CARS}`, element: <CarsPage /> },
      { path: `${ROUTES.CAR_DETAILS}`, element: <CarDetailsPage /> },
      { path: `${ROUTES.CAR_EDIT}`, element: <CarFormPage /> },
      { path: `${ROUTES.CAR_CREATE}`, element: <CarFormPage /> },
      { path: `${ROUTES.ON_SERVICE}`, element: <OnServicePage /> },
      { path: `${ROUTES.ON_SERVICE_DETAILS}`, element: <OrderDetailsPage /> },
      { path: `${ROUTES.ORDERS}`, element: <OrderPage /> },
      { paht: `${ROUTES.ORDERS_DETAILS}`, element: <OrderDetailsPage /> },
      { path: `${ROUTES.BOOKING}`, element: <BookingPage /> },
      { path: `${ROUTES.BOOKING_DETAILS}`, element: <OrderDetailsPage /> },
      { path: `${ROUTES.OFFERS}`, element: <OffersPage /> },
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
