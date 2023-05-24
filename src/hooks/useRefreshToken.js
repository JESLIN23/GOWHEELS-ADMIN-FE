import axios from '../Api/axios';
import userContextHook from './userContextHook';

function useRefreshToken() {
  const { setUser } = userContextHook();

  const refresh = async () => {
    const response = await axios.get('auth/refresh', {
      withCredentials: true,
    });
    setUser((prev) => {
      return {
        ...prev,
        role: response.data.role,
        accessToken: response.data.accessToken,
      };
    });

    return response.accessToken;
  };
  return refresh;
}

export default useRefreshToken;
