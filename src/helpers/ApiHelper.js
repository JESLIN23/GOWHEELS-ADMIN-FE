// import axios from 'axios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import axios from '../Api/axios';

import { DEFAULT_ERROR_MESSAGE } from '../const';

// const refreshAccessToken = async () => {
//   const { setUser } = userContextHook();
//   const refreshToken = Cookies.get('refreshToken');
//   if (!refreshToken) {
//     return;
//   }

//   const url = `${BACKEND_URL}/auth/refresh`;
//   const response = await request({
//     url,
//     method: 'POST',
//   });

//   setUser({ ...response });
// };

// const request = async (option, retry = 0) => {
//   const { user } = userContextHook();
//   if (option.requireAuth && !Cookies.get('refreshToken')) {
//     throw new Error('Invalid API call, require auth please logged in');
//   }

//   option.headers = option.headers || {};

//   if (option.requireAuth) {
//     const accessToken = user.accessToken;
//     if (accessToken) {
//       option.headers['Authorization'] = accessToken;
//     }
//   }

//   try {
//     const response = await axios(option);
//     return response;
//   } catch (error) {
//     const response = error?.response || {};
//     const statusCode = response?.status;

//     if (retry >= 2 || (statusCode && statusCode >= 500)) {
//       _throwHttpError(error);
//     }

//     const body = response.data || {};
//     if (
//       body.code === 'ACCESS_TOKEN_EXPIRED' ||
//       body.code === 'USER_HAS_NO_PERMISSION' ||
//       body.code === 'MISSING_AUTH_TOKEN'
//     ) {
//       await refreshAccessToken();
//     }

//     return request(option, retry + 1);
//   }
// };
const request = async (option) => {
  if (option.requireAuth) {
    throw new Error('Invalid API call, require auth');
  }

  option.headers = option.headers || {};

  try {
    const response = await axios(option);
    return response?.data;
  } catch (error) {
    const response = error?.response || {};
    const statusCode = response?.status;

    if (statusCode && statusCode < 500) {
      _throwHttpError(error);
    }
  }
};

const privateRequest = async (option) => {
  const axiosPrivate = useAxiosPrivate();

  option.headers = option.headers || {};

  try {
    const response = await axiosPrivate(option);
    return response;
  } catch (error) {
    const response = error?.response || {};
    const statusCode = response?.status;

    if (statusCode && statusCode < 500) {
      _throwHttpError(error);
    }
  }
};

const _throwHttpError = (error) => {
  const response = error?.response?.data || {};
  const message = response?.message || DEFAULT_ERROR_MESSAGE;
  throw new Error(message);
};

const ApiHelper = {
  request,
  privateRequest,
};

export default ApiHelper;
