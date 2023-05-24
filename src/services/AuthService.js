import ApiHelper from '../helpers/ApiHelper';

const login = async (data) => {
  const url = `/auth/login`;
  const response = await ApiHelper.request({ url, method: 'POST', data });
  return response;
};

const logout = async () => {
  const url = `/auth/logout`;
  const response = await ApiHelper.privateRequest({ url, method: 'DELETE', requireAuth: true });
  return response;
};

const AuthService = {
  login,
  logout,
};

export default AuthService;
