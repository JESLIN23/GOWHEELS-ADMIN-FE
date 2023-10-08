import React, { useState, useEffect, useCallback } from 'react';
// import styles from './CarsPage.module.css';
import ConfirmPopup from '../../utils/Alerts/ConfirmPopup';
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Loader from '../../utils/Loading/loading';
import AlertContextHook from '../../hooks/AlertContextHook';
import { ROUTES } from '../../const';
import CarServices from '../../services/CarServices';
import PageStyles from '../PageStyles.module.css';
import Info from '../../utils/Alerts/Info';
import CarListItem from './CarList';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Button, MenuItem, Menu, Fade } from '@mui/material';
import { city } from '../CarForm/CarDataConfig';

export default function CarsPage() {
  return (
      <Cars />
  );
}

function Cars() {
  const [cars, setCars] = useState(null);
  const [filteredCars, setFilteredCars] = useState(null);
  const [loadingIndicator, setLoadingIndicator] = useState(false);
  const [deleteCar, setDeleteCar] = useState({});
  const [searchText, setSearchText] = useState('');
  const [carEdit, setCarEdit] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [queryString, setQueryString] = useState({ active: true });

  const { postSuccessAlert, postErrorAlert } = AlertContextHook();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

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
    navigate(ROUTES.CAR_CREATE);
  };

  const handleFilterMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleFilterMenuClose = () => {
    setAnchorEl(null);
  };

  const getCars = useCallback(async () => {
    setLoadingIndicator(true);
    try {
      let query = `?${createSearchParams(queryString)}`;
      const res = await CarServices.getAllCars(query);
      setCars(res);
      setFilteredCars(res);
    } catch (error) {
      postErrorAlert(error.message);
    }
    setLoadingIndicator(false);
  }, [queryString, postErrorAlert]);

  useEffect(() => {
    const newParams = Object.fromEntries([...searchParams]);
    if (newParams?.active === 'false') {
      setQueryString({ ...queryString, active: 'false' });
    } else if (newParams?.active === 'true') {
      setQueryString({ ...queryString, active: 'true' });
    } else {
      navigate({
        pathname: '/cars',
        search: `?${createSearchParams(queryString)}`,
      });
    }

    //eslint-disable-next-line
  }, [searchParams]);

  useEffect(() => {
    if (carEdit?.id) {
      navigate(ROUTES.CAR_EDIT.replace(':carId', carEdit.id));
    }
     //eslint-disable-next-line
  }, [carEdit]);

  useEffect(() => {
    navigate({
      pathname: '/cars',
      search: `?${createSearchParams(queryString)}`,
    });
     //eslint-disable-next-line
  }, [queryString]);

  useEffect(() => {
    getCars();
     //eslint-disable-next-line
  }, [queryString]);

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
          {queryString?.active === true ? `Active Cars` : `Deactive Cars`}
          <span className={PageStyles.menuName}>Management</span>
        </h2>
        <div className={PageStyles.titleSecRight}>
          <div className={PageStyles.filterPart}>
            <Button
              id="fade-button"
              onClick={handleFilterMenuClick}
              endIcon={<FilterAltOutlinedIcon />}
            >
              Filter by city
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleFilterMenuClose}
              TransitionComponent={Fade}
            >
              <MenuItem
                onClick={() => {
                  let queryData = { ...queryString };
                  delete queryData['city'];
                  setQueryString(queryData);
                  handleFilterMenuClose();
                }}
              >
                All
              </MenuItem>
              {city.map((el, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    setQueryString({ ...queryString, city: el });
                    handleFilterMenuClose();
                  }}
                >
                  {el}
                </MenuItem>
              ))}
            </Menu>
          </div>
          <span className={PageStyles.coloredBtn} onClick={navigateToCreateCar}>
            ADD NEW CAR
          </span>
        </div>
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
        {cars && cars.length
          ? filteredCars && filteredCars.length
            ? filteredCars.map((filteredCar) => (
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
            : !loadingIndicator && (
                <Info
                  title={'No cars to list'}
                  content={
                    'You have no car to list with current filter configuration. Please clear the filters or add cars'
                  }
                />
              )
          : !loadingIndicator && (
              <Info
                title={'No car to list'}
                content={'You have no car to list. Please add cars'}
              />
            )}
      </div>
    </div>
  );
}
