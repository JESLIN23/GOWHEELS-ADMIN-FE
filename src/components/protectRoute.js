import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../const';
import React, {useContext} from 'react';
import UserContext from '../context/UserContext';
//import { Outlet } from 'react-router-dom';

export default function protectRoute({children}) {
  const location = useLocation();
  const { isLoggedIn, isAuthorized } = useContext(UserContext);

  const _isLoggedIn = isLoggedIn()
  const _isAuthorized = isAuthorized()

  if (!_isLoggedIn) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  if (!_isAuthorized) {
    return (
      <Navigate to={ROUTES.UNAUTHORIZED} state={{ from: location }} replace />
    );
  }

  return <>{children}</>;


    // return _isAuthorized === 'admin' ? (
    //   <Outlet />
    // ) : _isLoggedIn ? (
    //   <Navigate to={ROUTES.UNAUTHORIZED} state={{ from: location }} replace />
    // ) : (
    //   <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
    // );
}
