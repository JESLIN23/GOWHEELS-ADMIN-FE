import ApiHelper from '../helpers/ApiHelper';
import DateConvertion from '../helpers/LocalDateString';

const getAllUser = async (query) => {
  const url = `/users${query}`;
  const users = await ApiHelper.request({
    url,
    method: 'GET',
    requireAuth: true,
  });

  const document = users?.data?.document.map((el) => {
    const dateString = DateConvertion.LocalDateString(el?.date_of_birth);
    return { ...el, date_of_birth: dateString };
  });

  return { ...users, data: { document } };
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
  const dateString = DateConvertion.LocalDateString(res?.date_of_birth);

  return { ...res, date_of_birth: dateString };
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
  const dateString = DateConvertion.LocalDateString(res?.date_of_birth);

  return { ...res, date_of_birth: dateString };
};

const UserServices = {
  getAllUser,
  getUser,
  updateUser,
};

export default UserServices;
