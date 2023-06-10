import ApiHelper from '../helpers/ApiHelper';

const getAllCars = async (query) => {
  const url = `/car${query}`;
  const response = await ApiHelper.request({
    url,
    method: 'GET',
  });

  return response?.data?.document;
};

const getCar = async (carId, signal) => {
  const url = `/car/${carId}`;
  const response = await ApiHelper.request({
    url,
    method: 'GET',
    signal,
  });

  return response?.data?.document;
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
  const response = await ApiHelper.request({
    url,
    method: 'PATCH',
    data,
    requireAuth: true,
  });

  return response?.data?.document;
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
