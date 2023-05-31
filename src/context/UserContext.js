import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import AuthService from '../services/AuthService';
import { STORAGE_KEYS } from '../const';
import AlertMessageContext from './AlertMessageContext';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState({});
  const [IsLoadingUserDetails, setIsLoadingUserDetails] = useState(false);
  const { postErrorAlert } = useContext(AlertMessageContext);

  const initiateLogin = async (data) => {
    const response = await AuthService.login(data);
    setProfile(response.user);
  };

  const initiateLogout = async () => {
    setIsLoadingUserDetails(true);
    try {
      await AuthService.logout();
    } catch (error) {
      console.log(error);
    }
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    setProfile({});
    setIsLoadingUserDetails(false);
  };

  const isLoggedIn = () => {
    return Boolean(localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN));
  };

  const getProfile = useCallback(async () => {
    if (!isLoggedIn()) {
      return;
    }

    try {
      const response = await AuthService.getUserProfile();
      setProfile(response);
    } catch (error) {
      console.log(error);
      postErrorAlert(error.message);
    }
  }, [setProfile, postErrorAlert]);

  useEffect(() => {
    async function loadInitialDetails() {
      setIsLoadingUserDetails(true);
      await getProfile();
      setIsLoadingUserDetails(false);
    }

    loadInitialDetails().then();
  }, [getProfile]);

  return (
    <UserContext.Provider
      value={{
        profile,
        isLoggedIn,
        initiateLogin,
        initiateLogout,
        IsLoadingUserDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
