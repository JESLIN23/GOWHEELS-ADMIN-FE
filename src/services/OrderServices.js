import ApiHelper from '../helpers/ApiHelper';
import DateConvertion from '../helpers/LocalDateString';

const getAllOrder = async (query, signal) => {
  let url;
  if (query) {
    url = `/order${query}`;
  } else {
    url = '/order';
  }
   
  const response = await ApiHelper.request({
    url,
    method: 'GET',
    signal,
    requireAuth: true,
  });

  const res = response?.data?.document;
  const data = res.map((el) => {
    const pickup_date = DateConvertion.LocalDateTimeString(el?.pickup_date);
    const dropoff_date = DateConvertion.LocalDateTimeString(el?.dropoff_date);

    return { ...el, pickup_date, dropoff_date };
  });

  return data;
};

const getOrder = async (orderId, signal) => {
  const url = `/order/${orderId}`;
  const response = await ApiHelper.request({
    url,
    method: 'GET',
    signal,
    requireAuth: true,
  });

  const res = response?.data?.document;

  const pickup_date = DateConvertion.LocalDateTimeString(res?.pickup_date);
  const dropoff_date = DateConvertion.LocalDateTimeString(res?.dropoff_date);

  return { ...res, pickup_date, dropoff_date };
};

const updateOrder = async (orderId, data) => {
  const url = `/order/${orderId}`;
  const response = await ApiHelper.request({
    url,
    method: 'PATCH',
    data,
    requireAuth: true,
  });

  const res = response?.data?.document;
  const pickup_date = DateConvertion.LocalDateTimeString(res?.pickup_date);
  const dropoff_date = DateConvertion.LocalDateTimeString(res?.dropoff_date);

  return { ...res, pickup_date, dropoff_date };
};
const closeOrder = async (id) => {
  const url = `/order/close-order/${id}`;
  await ApiHelper.request({
    url,
    method: 'PATCH',
    requireAuth: true,
  });
};
const cancelOrder = async (id) => {
  const url = `/order/cancel-order/${id}`;
  const response = await ApiHelper.request({
    url,
    method: 'PATCH',
    requireAuth: true,
  });
  const res = response?.data?.document;
  const pickup_date = DateConvertion.LocalDateTimeString(res?.pickup_date);
  const dropoff_date = DateConvertion.LocalDateTimeString(res?.dropoff_date);

  return { ...res, pickup_date, dropoff_date };
};

const OrderServices = {
  closeOrder,
  updateOrder,
  getOrder,
  getAllOrder,
  cancelOrder,
};

export default OrderServices;
