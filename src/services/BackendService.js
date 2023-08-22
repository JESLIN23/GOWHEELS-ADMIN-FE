import axios from "axios";
import { BACKEND_URL, HEADERS, STORAGE_KEYS } from "../const";
import AuthService from "./AuthService";

async function getData(path, headers = {}, params = {}) {
  const resp = await get(path, headers, params);
  return _getResponseData(resp);
}

async function postData(path, data, headers, params) {
  const resp = await post(path, data, headers, params);
  return _getResponseData(resp);
}

async function get(path, headers, params, responseType) {
  return _request(path, {
    method: "GET",
    ..._genParams(headers, params, responseType),
  });
}

async function post(path, data, headers, params, responseType) {
  return _request(path, {
    method: "POST",
    data,
    ..._genParams(headers, params, responseType),
  });
}

async function destroy(path, data, headers, params, responseType) {
  const resp = await _request(path, {
    method: "DELETE",
    data,
    ..._genParams(headers, params, responseType),
  });
  return _getResponseData(resp);
}

async function put(path, data) {
  const resp = await _request(path, {
    method: "PUT",
    data,
    ..._genParams(),
  });
  return _getResponseData(resp);
}

async function _request(path, config) {
  try {
    return await axios({ url: `${BACKEND_URL}${path}`, ...config });
  } catch (error) {
    _isInvalidTokenError(error) && (await _handleInvalidTokenError());
    throw error;
  }
}

function _genParams(headers = {}, params = {}, responseType = undefined) {
  const authToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

  const localHeaders = {
    ...headers,
    [HEADERS.AUTH]: authToken ? `Bearer ${authToken}` : headers[HEADERS.AUTH],
  };

  return {
    headers: localHeaders,
    params,
    responseType,
  };
}

async function _getResponseData(resp) {
  if (resp?.data?.status === 200) {
    return resp.data;
  }
  throw new Error((resp.data || {}).message);
}

function _isInvalidTokenError(error) {
  return error?.response?.status === 401 || error?.response?.status === 403;
}

async function _handleInvalidTokenError() {
  await AuthService.logout();
  window.location.reload();
}

const BackendService = {
  getData,
  postData,
  get,
  post,
  put,
  destroy,
};

export default BackendService;
