import { STORAGE_KEY, BACKEND_URL } from '../const';
import ApiHelper from '../helpers/ApiHelper';

const login = async (data = {}) => {
  const path = `${BACKEND_URL}/auth/login`;
  const response = await ApiHelper.request({ path, method: 'POST', data });

  localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, response.accessToken);

  return response.data.user;
};

const logout = async () => {
  const path = `${BACKEND_URL}/auth/logout`;
  return await ApiHelper.request({ path, method: 'POST', requireAuth: true });
};

const resetPassword = async () => {};

const AuthService = {
  login,
  logout,
  resetPassword,
};

export default AuthService;
