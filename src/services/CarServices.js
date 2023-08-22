import ApiHelper from '../helpers/ApiHelper';
import DateConvertion from '../helpers/LocalDateString';

const getAllCars = async (query) => {
  const url = `/car${query}`;
  const response = await ApiHelper.request({
    url,
    method: 'GET',
    requireAuth: true,
  });

  const res = response?.data?.document;
  const data = res.map((el) => {
    const bookedAt = DateConvertion.LocalDateTimeString(el?.BookedAt);
    const bookedTo = DateConvertion.LocalDateTimeString(el?.BookedTo);

    return { ...el, BookedAt: bookedAt, BookedTo: bookedTo };
  })

  return data;
};

const getCar = async (carId, signal) => {
  const url = `/car/${carId}`;
  const response = await ApiHelper.request({
    url,
    method: 'GET',
    signal,
    requireAuth: true,
  });

  const res = response?.data?.document;
  if (res?.booked) {
    const bookedAt = DateConvertion.LocalDateTimeString(res?.BookedAt);
    const bookedTo = DateConvertion.LocalDateTimeString(res?.BookedTo);

    return { ...res, BookedAt: bookedAt, BookedTo: bookedTo };
  }

  return res;
};

const createCar = async (data) => {
  const url = `/car`;
  const response = await ApiHelper.request({
    url,
    method: 'POST',
    data,
    requireAuth: true,
  });

  return response?.data?.document;
};

const updateCar = async (id, data) => {
  const url = `/car/${id}`;
  console.log(data);
  const response = await ApiHelper.request({
    url,
    method: 'PATCH',
    data,
    requireAuth: true,
  });

  const res = response?.data?.document;
  if (res?.booked) {
    const bookedAt = DateConvertion.LocalDateTimeString(res?.BookedAt);
    const bookedTo = DateConvertion.LocalDateTimeString(res?.BookedTo);

    return { ...res, BookedAt: bookedAt, BookedTo: bookedTo };
  }

  return res;
};

const deleteCar = async (id) => {
  const url = `/car/${id}`;
  await ApiHelper.request({
    url,
    method: 'DELETE',
    requireAuth: true,
  });
};

const addCarImage = async (carId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  const url = `/car/${carId}/image`;
  await ApiHelper.request({
    url,
    method: 'PATCH',
    data: formData,
    requireAuth: true,
  });
};

const CarServices = {
  getAllCars,
  deleteCar,
  updateCar,
  getCar,
  createCar,
  addCarImage,
};

export default CarServices;
