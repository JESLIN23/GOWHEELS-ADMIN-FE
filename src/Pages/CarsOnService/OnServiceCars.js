import React, { useEffect, useState, useCallback } from 'react';
import PageStyles from '../PageStyles.module.css';
import SearchIcon from '@mui/icons-material/Search';
import Loader from '../../utils/Loading/loading';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Menu, Fade, MenuItem, Button } from '@mui/material';
import { city } from '../CarForm/CarDataConfig';
import { createSearchParams } from 'react-router-dom';
import AlertContextHook from '../../hooks/AlertContextHook';
import OrderServices from '../../services/OrderServices';
import Info from '../../utils/Alerts/Info';
import { ROUTES } from '../../const';
import OnServiceCarListItem from './OnServiceCarListItem';

export default function carsOnService() {
  return (
      <OnServiceCars />
  );
}

function OnServiceCars() {
  const [loadingIndicator, setLoadingIndicator] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [queryString, setQueryString] = useState({
    verified: true,
    closed: false
  });
  const [searchText, setSearchText] = useState('');
  const [cars, setCars] = useState(null);
  const [filteredCars, setFilteredCars] = useState(null);

  const { postErrorAlert } = AlertContextHook();

  const handleFilterMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleFilterMenuClose = () => {
    setAnchorEl(null);
  };
  const handleSearch = (value) => {
    setSearchText(value);
    let searchCars = cars
      ? cars.filter(
          (car) =>
            car.car.name.toLowerCase().includes(value.toLowerCase()) ||
            car.car.transmission.toLowerCase().includes(value.toLowerCase()) ||
            car.car.brand.toLowerCase().includes(value.toLowerCase()) ||
            car.car.fuel.toLowerCase().includes(value.toLowerCase()) ||
            car.car.segment.toLowerCase().includes(value.toLowerCase()) ||
            car.status.toLowerCase().includes(value.toLowerCase())
        )
      : [];
    setFilteredCars(searchCars);
  };

  const getOnServiceCars = useCallback(async () => {
    setLoadingIndicator(true);
    try {
      let query = `?${createSearchParams(queryString)}`;
      const res = await OrderServices.getAllOrder(query);
      setCars(res);
      setFilteredCars(res);
    } catch (error) {
      postErrorAlert(error.message);
    }
    setLoadingIndicator(false);
  }, [queryString]);

  useEffect(() => {
    getOnServiceCars();
  }, [queryString]);

  return (
    <div className={PageStyles.contentWrapper}>
      {/* {Object.keys(deleteCar).length > 0 && (
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
      )} */}
      <Loader isOpen={loadingIndicator} />
      <div className={PageStyles.titleSec}>
        <h2 className={PageStyles.title}>
          {'On-Service'}
          <span className={PageStyles.menuName}>Management</span>
        </h2>
        <div className={PageStyles.titleSecRight}>
          <div className={PageStyles.filterPart}>
            <Button
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
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
                <OnServiceCarListItem
                  key={filteredCar.id}
                  data={filteredCar}
                  link={ROUTES.ON_SERVICE_DETAILS.replace(
                    ':orderId',
                    filteredCar.id
                  )}
                />
              ))
            : !loadingIndicator && (
                <Info
                  title={'No cars to list'}
                  content={
                    'You have no car to list with current filter configuration.'
                  }
                />
              )
          : !loadingIndicator && (
              <Info
                title={'No car to list'}
                content={'No car is currently in service.'}
              />
            )}
      </div>
    </div>
  );
}
