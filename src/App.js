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
import { UserProvider } from './context/UserContext';
import { AlertMessageProvider } from './context/AlertMessageContext';
import { OrderProvider } from './context/OrderContext';
import ProtectRoute from './components/ProtectRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <UserProvider>
        <AlertMessageProvider>
          <OrderProvider>
            <RootLayout />
          </OrderProvider>
        </AlertMessageProvider>
      </UserProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <ProtectRoute element={DashboardPage} /> },
      {
        path: `${ROUTES.DASHBOARD}`,
        element: <ProtectRoute element={DashboardPage} />,
      },
      { path: `${ROUTES.USERS}`, element: <ProtectRoute element={UserPage} /> },
      {
        path: `${ROUTES.USER_DETAILS}`,
        element: <ProtectRoute element={UserDetailsPage} />,
      },
      { path: `${ROUTES.CARS}`, element: <ProtectRoute element={CarsPage} /> },
      {
        path: `${ROUTES.CAR_DETAILS}`,
        element: <ProtectRoute element={CarDetailsPage} />,
      },
      {
        path: `${ROUTES.CAR_EDIT}`,
        element: <ProtectRoute element={CarFormPage} />,
      },
      {
        path: `${ROUTES.CAR_CREATE}`,
        element: <ProtectRoute element={CarFormPage} />,
      },
      {
        path: `${ROUTES.ON_SERVICE}`,
        element: <ProtectRoute element={OnServicePage} />,
      },
      {
        path: `${ROUTES.ON_SERVICE_DETAILS}`,
        element: <ProtectRoute element={OrderDetailsPage} />,
      },
      {
        path: `${ROUTES.ORDERS}`,
        element: <ProtectRoute element={OrderPage} />,
      },
      {
        paht: `${ROUTES.ORDERS_DETAILS}`,
        element: <ProtectRoute element={OrderDetailsPage} />,
      },
      {
        path: `${ROUTES.BOOKING}`,
        element: <ProtectRoute element={BookingPage} />,
      },
      {
        path: `${ROUTES.BOOKING_DETAILS}`,
        element: <ProtectRoute element={OrderDetailsPage} />,
      },
      {
        path: `${ROUTES.OFFERS}`,
        element: <ProtectRoute element={OffersPage} />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <UserProvider>
        <AlertMessageProvider>
          <UserLayout />
        </AlertMessageProvider>
      </UserProvider>
    ),
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
