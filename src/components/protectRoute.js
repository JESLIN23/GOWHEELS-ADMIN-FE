import { Navigate } from 'react-router-dom';
import { ROUTES } from '../const';
import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

// export default function protectRoute({ children }) {
//   const location = useLocation();
//   const { isLoggedIn } = useContext(UserContext);

//   const _isLoggedIn = isLoggedIn();

//   if (!_isLoggedIn) {
//     return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
//   }

//   return <>{children}</>;
// }

export default function ProtectedRoute({ element: Element, ...props }) {
  const { isLoggedIn } = useContext(UserContext);

  const isAuthenticated = isLoggedIn();
  return isAuthenticated ? (
    <Element {...props} />
  ) : (
    <Navigate to={ROUTES.LOGIN} />
  );
}
