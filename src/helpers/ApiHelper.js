// import React,{ Navigate } from 'react-router-dom';
import axios from '../Api/axios';
import { DEFAULT_ERROR_MESSAGE } from '../const';
import { STORAGE_KEYS } from '../const';

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    return;
  }

  const url = `/auth/refresh`;
  const response = await request({
    url,
    method: 'POST',
    data: { refreshToken },
  });
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
};

const request = async (option, retry = 0) => {
  if (option.requireAuth && !localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)) {
    throw new Error(
      'Invalid API call, called API require auth without logging in'
    );
  }

  // window.addEventListener('offline', function () {
  //   throw new Error('You are offline');
  // });
  if (!navigator.onLine) {
    throw new Error('You are offline');
  }

  option.headers = option.headers || {};
  if (option.requireAuth) {
    const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (accessToken) {
      option.headers['Authorization'] = `Bearer ${accessToken}`;
    }
  }

  try {
    const response = await axios(option);
    return response.data;
  } catch (error) {
    const response = error?.response || {};
    const statusCode = response?.status;

    // if (error?.message === 'Network Error') {
    //   _throwNetworkError()
    // }

    if (retry >= 2 || (statusCode && statusCode >= 500)) {
      _throwHttpError(error);
    }

    // const body = response.data || {};
    // if (response.status === 401) {
    //   localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    //   localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    //   window.location.reload();
    //   throw error;
    // }

    if (response.status === 403) {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      let refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      await refreshAccessToken(refreshToken);
    }

    // Retrying requests for 500+ error responses
    return request(option, retry + 1);
  }
};

// const _throwNetworkError = () => {
//   return <Navigate to={'/'} />
// }

const _throwHttpError = (error) => {
  const response = error?.response?.data || {};
  const message = response.message || DEFAULT_ERROR_MESSAGE;
  throw new Error(message);
};

const ApiHelper = {
  request,
};

export default ApiHelper;
