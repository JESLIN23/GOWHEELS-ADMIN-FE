import ApiHelper from '../helpers/ApiHelper';
import { STORAGE_KEYS } from '../const';

const login = async (data) => {
  const url = `/auth/login`;
  const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  const response = await ApiHelper.request({
    url,
    method: 'POST',
    data: { ...data, refreshToken },
  });

  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);

  return response;
};

const logout = async () => {
  const url = `/auth/logout`;
  const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  const response = await ApiHelper.request({
    url,
    method: 'DELETE',
    data: { refreshToken },
    requireAuth: true,
  });

  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);

  return response;
};

const AuthService = {
  login,
  logout,
};

export default AuthService;
