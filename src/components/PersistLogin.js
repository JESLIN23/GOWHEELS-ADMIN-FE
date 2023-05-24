import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import userContextHook from '../hooks/userContextHook';
import useRefreshToken from '../hooks/useRefreshToken';
import Loader from '../utils/Loading/loading';
// import AlertMessageContext from '../context/AlertMessageContext';
//import UserContext from '../context/UserContext';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { user } = userContextHook();
  // const { postErrorAlert } = useContext(AlertMessageContext);
  // const { user } = useContext(UserContext)
  const navigate = useNavigate()

  console.log(user);
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
        navigate('/login')
      } finally {
        setIsLoading(false);
      }
    };
    
    !user?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <Loader isOpen={isLoading} /> : <Outlet />}</>;
};

export default PersistLogin;

