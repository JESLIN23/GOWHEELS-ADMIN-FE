export const BACKEND_URL = 'http://localhost:6060/api/v1';

export const ROUTES = {
  DASHBOARD: '/dashboard',
  CARS: '/cars',
  ACTIVE_CARS: '/cars?active=true',
  DEACTIVE_CARS: '/cars?active=false',
  ON_SERVICE: '/on-service',
  ON_SERVICE_DETAILS: '/on-service/:orderId',
  ORDERS: '/orders',
  ORDER_DETAILS: '/orders/:orderId',
  CAR_DETAILS: '/cars/:carId/details',
  CAR_EDIT: '/cars/:carId/edit',
  CAR_CREATE: '/cars/create',
  USERS: '/users',
  ACTIVE_USERS: '/users?active=true',
  DEACTIVE_USERS: '/users?active=false',
  USER_DETAILS: '/users/:userId',
  BOOKING: '/booking',
  LOGIN: '/login',
  REGISTER: '/signup',
  OFFLINE: '/offline',
  UNAUTHORIZED: '/unauthorized',
  OFFERS: '/offers',
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'gowheels-auth-accesstoken',
  REFRESH_TOKEN: 'gowheels-auth-refreshtoken',
  USER_ID: 'gowheels-auth-user-id',
  FIRST_NAME: 'gowheels-first-name',
  SECOND_NAME: 'gowheels-second-name',
};

export const HEADERS = {
  AUTH: 'Authentication',
};

export const DEFAULT_ERROR_MESSAGE =
  'Oops, Something went wrong. If this persists, please contact us.';
