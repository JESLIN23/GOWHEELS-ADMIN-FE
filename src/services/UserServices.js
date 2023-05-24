import ApiHelper from '../helpers/ApiHelper';

const getUsers = async () => {
  const url ='/users';
  const users = await ApiHelper.privateRequest({
    url,
    methord: 'GET',
    signal: AbortController.signal,
  });
  return users;
};

const UserServices = {
  getUsers,
};

export default UserServices;
