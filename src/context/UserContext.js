import React, { createContext, useState } from 'react';
import AuthService from '../services/AuthService';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const initiateLogin = async (credentials) => {
    const response = await AuthService.login(credentials);
    setUser(response)
  };
  return (
    <UserContext.Provider value={{ user, setUser, initiateLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
