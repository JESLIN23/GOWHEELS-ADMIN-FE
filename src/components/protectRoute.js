import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../const';
import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
// import { Outlet } from 'react-router-dom';

export default function protectRoute({ children }) {
  const location = useLocation();
  const { isLoggedIn } = useContext(UserContext);

  const _isLoggedIn = isLoggedIn();

  if (!_isLoggedIn) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  } 

  return <>{children}</>;
}
