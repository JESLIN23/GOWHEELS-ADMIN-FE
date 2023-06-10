import React, { useState, useEffect, useCallback } from 'react';
import ProtectRoute from '../../components/ProtectRoute';
// import styles from './CarsPage.module.css';
import ConfirmPopup from '../../utils/Alerts/ConfirmPopup';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Loader from '../../utils/Loading/loading';
import AlertContextHook from '../../hooks/AlertContextHook';
import { ROUTES } from '../../const';
import CarServices from '../../services/CarServices';
import PageStyles from '../PageStyles.module.css';
import Info from '../../utils/Alerts/Info';
import CarListItem from './CarList';

export default function CarsPage() {
  return (
    <ProtectRoute>
      <Cars />
    </ProtectRoute>
  );
}

function Cars() {
  const [cars, setCars] = useState(null);
  const [filteredCars, setFilteredCars] = useState(null);
  const [loadingIndicator, setLoadingIndicator] = useState(false);
  const [deleteCar, setDeleteCar] = useState({});
  const [searchText, setSearchText] = useState('');
  const [carManagement, setCarManagement] = useState(true);
  const [carEdit, setCarEdit] = useState({});

  const { postSuccessAlert, postErrorAlert } = AlertContextHook();

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const newParams = Object.fromEntries([...searchParams]);
    if (newParams?.active === 'false') {
      setCarManagement(false);
    } else {
      setCarManagement(true);
    }
    //  setUserManagement(searchParams.get('active'));
  }, [searchParams]);

  const handleSearch = (value) => {
    setSearchText(value);
    let searchCars = cars
      ? cars.filter(
          (car) =>
            car.name.toLowerCase().includes(value.toLowerCase()) ||
            car.transmission.toLowerCase().includes(value.toLowerCase()) ||
            car.brand.toLowerCase().includes(value.toLowerCase()) ||
            car.fuel.toLowerCase().includes(value.toLowerCase()) ||
            car.segment.toLowerCase().includes(value.toLowerCase())
        )
      : [];
    setFilteredCars(searchCars);
  };

  const clinkDeleteCarHandler = (data) => {
    setDeleteCar(data);
  };

  const deleteCarHandler = async (data) => {
    setLoadingIndicator(true);
    try {
      const id = data.id;
      await CarServices.deleteCar(id);
      postSuccessAlert('Car deleted successfully');
      await getCars();
    } catch (error) {
      postErrorAlert(error.message);
    }
    setLoadingIndicator(false);
  };

  const navigateToCreateCar = () => {
    navigate(ROUTES.CAR_CREATE)
  }

  const getCars = useCallback(async () => {
    setLoadingIndicator(true);
    try {
      let query;
      if (carManagement === true) {
        query = `?active=true`;
      } else {
        query = `?active=false`;
      }
      const res = await CarServices.getAllCars(query);
      setCars(res);
      console.log(res);
      setFilteredCars(res);
    } catch (error) {
      postErrorAlert(error.message);
    }
    setLoadingIndicator(false);
  }, [carManagement]);

  useEffect(() => {
    if (carEdit?.id) {
      navigate(ROUTES.CAR_DETAILS.replace(':carId', carEdit.id));
    }
  }, [carEdit]);

  useEffect(() => {
    getCars().then();
  }, [carManagement]);

  return (
    <div className={PageStyles.contentWrapper}>
      {Object.keys(deleteCar).length > 0 && (
        <ConfirmPopup
          data={deleteCar}
          cancelBtnName={'cancel'}
          successBtnName={'delete'}
          alertTitle={'Confirm delete'}
          alertMessage={
            'Deleted car not accessable to the customers, do you want to delete this car ?'
          }
          handleClose={clinkDeleteCarHandler}
          handleOkey={deleteCarHandler}
        />
      )}
      <Loader isOpen={loadingIndicator} />
      <div className={PageStyles.titleSec}>
        <h2 className={PageStyles.title}>
          {carManagement ? `Active Cars` : `Deactive Cars`}
          <span className={PageStyles.menuName}>Management</span>
        </h2>
        <span className={PageStyles.coloredBtn} onClick={navigateToCreateCar}>ADD NEW CAR</span>
      </div>
      <div className={PageStyles.searchPart}>
        <div></div>
        <div className={PageStyles.searchSec}>
          <input
            type="text"
            value={searchText}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            className={PageStyles.searchInput}
            placeholder="search items"
          />
          <SearchIcon className={PageStyles.searchIcon} />
        </div>
      </div>
      <div className={PageStyles.cardsWrapper}>
        {cars && cars.length ? (
          filteredCars && filteredCars.length ? (
            filteredCars.map((filteredCar) => (
              <CarListItem
                key={filteredCar.id}
                data={filteredCar}
                link={ROUTES.CAR_DETAILS.replace(':carId', filteredCar.id)}
                editHandler={(car) => {
                  setCarEdit(car);
                }}
                deleteHandler={clinkDeleteCarHandler}
              />
            ))
          ) : (
            <Info
              title={'No cars to list'}
              content={
                'You have no car to list with current filter configuration. Please clear the filters or add cars'
              }
            />
          )
        ) : (
          <Info
            title={'No car to list'}
            content={'You have no car to list. Please add cars'}
          />
        )}
      </div>
    </div>
  );
}
