import ApiHelper from '../helpers/ApiHelper';
import { STORAGE_KEYS } from '../const';

const login = async (data) => {
  const url = `/auth/login-admin`;
  const response = await ApiHelper.request({
    url,
    method: 'POST',
    data,
  });

  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);

  return response;
};

const logout = async () => {
  const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  if (!refreshToken) {
    return;
  }
  localStorage.clear()
  const url = `/auth/logout`;
  const response = await ApiHelper.request({
    url,
    method: 'DELETE',
    data: { refreshToken },
    requireAuth: true,
  });

  return response;
};

const getUserProfile = async () => {
  const url = `/auth/user-profile`;
  const response = await ApiHelper.request({
    url,
    method: 'GET',
    requireAuth: true,
  });
  return response.data.user;
};

const AuthService = {
  login,
  logout,
  getUserProfile,
};

export default AuthService;
