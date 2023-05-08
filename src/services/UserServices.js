import { ROUTES } from '../const';
import BackendServices from './BackendServices';

const getUsers = async () => {
  const path = `${ROUTES.USERS}`;
  const users = await BackendServices.get(path)
  return users;
};

const UserServices = {
  getUsers,
};

export default UserServices;
