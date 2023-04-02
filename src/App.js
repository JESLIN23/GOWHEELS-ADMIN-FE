import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ErrorPage from './Pages/ErrorPage/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <DashbordPage /> },
      { path: '/dashbord', element: <DashbordPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
