import ApiHelper from '../helpers/ApiHelper';

const getAllUser = async (query) => {
  const url = `/users${query}`;
  const users = await ApiHelper.request({
    url,
    method: 'GET',
    requireAuth: true,
  });
  return users.data.document;
};

const getUser = async (userId, signal) => {
  const url = `/users/${userId}`;
  const response = await ApiHelper.request({
    url,
    method: 'GET',
    signal,
    requireAuth: true,
  });

  const res = response.data.document;
  const date = new Date(response?.data?.document?.date_of_birth);
  const localDateString = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  console.log(response);

  return { ...res, date_of_birth: localDateString };
};

const updateUser = async (id, data) => {
  const url = `users/${id}`;
  const response = await ApiHelper.request({
    url,
    method: 'PATCH',
    data,
    requireAuth: true,
  });

  const res = response.data.document;
  const date = new Date(response?.data?.document?.date_of_birth);
  const localDateString = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });


  return { ...res, date_of_birth: localDateString };
};

const UserServices = {
  getAllUser,
  getUser,
  updateUser,
};

export default UserServices;
