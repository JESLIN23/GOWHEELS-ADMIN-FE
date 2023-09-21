// export const BACKEND_URL = 'http://localhost:6060/api/v1';
export const BACKEND_URL = 'https://api-gowheels.cyclic.cloud/api/v1';


export const ROUTES = {
  DASHBOARD: '/dashboard',
  CARS: '/cars',
  ACTIVE_CARS: '/cars?active=true',
  DEACTIVE_CARS: '/cars?active=false',
  ON_SERVICE: '/orders/on-service',
  ON_SERVICE_DETAILS: '/orders/on-service/:orderId',
  ORDERS: '/orders/all-orders',
  ORDERS_DETAILS: '/orders/all-orders/:orderId',
  BOOKING: '/orders/new-booking',
  BOOKING_DETAILS: '/orders/new-booking/:orderId',
  CAR_DETAILS: '/cars/:carId/details',
  CAR_EDIT: '/cars/:carId/edit',
  CAR_CREATE: '/cars/create',
  USERS: '/users',
  ACTIVE_USERS: '/users?active=true',
  DEACTIVE_USERS: '/users?active=false',
  USER_DETAILS: '/users/:userId',
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
