export const BACKEND_URL = 'http://localhost:6060/api/v1'

export const ROUTES = {
    DASHBOARD: '/dashboard',
    CARS: '/cars',
    USERS: '/users',
    BOOKING: '/booking',
    DEACTIVATEDUSER: '/deactivated',
    LOGIN: '/login',
    REGISTER: '/signup',
}

export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'gowheels-auth-accesstoken',
    REFRESH_TOKEN: 'gowheels-auth-refreshtoken',
    USER_ID: 'gowheels-auth-user-id',
    FIRST_NAME: 'gowheels-first-name',
    SECOND_NAME: 'gowheels-second-name',
}

export const HEADERS = {
    AUTH: 'Authentication'
}

export const DEFAULT_ERROR_MESSAGE = 
  "Oops, Something went wrong. If this persists, please contact us.";