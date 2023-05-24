import React, { createContext, useState } from 'react';
import AuthService from '../services/AuthService';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const initiateLogin = async (data) => {
    const response = await AuthService.login(data);
    setUser(response)
    console.log(user);
    console.log(response);
    _handleSuccessfullLogin(response)
  };

  const initiateLogout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  const isLoggedIn = () => {
    return Boolean(user?.accessToken);
  };
  const isAuthorized = () => {
    return Boolean(user?.role === 'admin');
  };

  const _handleSuccessfullLogin = () => {
    console.log('successfully logged in');
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoggedIn, isAuthorized, initiateLogin, initiateLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
