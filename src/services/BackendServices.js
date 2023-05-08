import axios from 'axios';
import { STORAGE_KEY, HEADERS, BACKEND_URL } from './../const';

const get = async (path, headers = {}, params = {}) => {
  const url = `${BACKEND_URL}${path}`;
  const response = await axios.get(url, _genParams(headers, params));
  return response.data;
};

const post = async (path, data = {}, headers = {}, params = {}) => {
  const url = `${BACKEND_URL}${path}`;
  const response = await axios.post(url, data, _genParams(headers, params));
  return response.data.document;
};

const patch = async (path, data = {}, headers = {}, params = {}) => {
  const url = `${BACKEND_URL}${path}`;
  const response = await axios.patch(url, data, _genParams(headers, params));
  return response.data.document;
};

const put = async (path, data = {}, headers = {}, params = {}) => {
  const url = `${BACKEND_URL}${path}`;
  const response = await axios.put(url, data, _genParams(headers, params));
  return response.data.document;
};

const distroy = async (path, data = {}, headers = {}, params = {}) => {
  const url = `${BACKEND_URL}${path}`;
  const response = await axios.delete(url, data, _genParams(headers, params));
  return response;
};

const _genParams = (headers = {}, params = {}) => {
  const authToken = localStorage.getItem(STORAGE_KEY.TOKEN);

  return {
    headers: {
      [HEADERS.AUTH]: `Bearer ${authToken}`,
      ...headers,
    },
    params,
  };
};

const BackendServices = {
  get,
  post,
  patch,
  put,
  distroy,
};

export default BackendServices;
