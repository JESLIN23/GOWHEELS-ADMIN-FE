import React, { useState, useEffect, useCallback } from 'react';
import PageStyles from '../PageStyles.module.css';
import Loader from '../../utils/Loading/loading';
import { ROUTES } from '../../const';
import { Breadcrumbs } from '@mui/material';
import EastSharpIcon from '@mui/icons-material/EastSharp';
import Info from '../../utils/Alerts/Info';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AlertContextHook from '../../hooks/AlertContextHook';
import SearchIcon from '@mui/icons-material/Search';
import CarServices from '../../services/CarServices';
import ConfirmPopup from '../../utils/Alerts/ConfirmPopup';
import CarDetailsPart from './CarDetailsPart';

function CarDetails() {
  const [loadingIndicator, setLoadingIndicator] = useState(false);
  const [carData, setCarData] = useState(null);
  const [carActivityData, setCarActivityData] = useState(null);
  const [carDelete, setCarDelete] = useState(null);

  const { carId } = useParams();
  const { postErrorAlert, postSuccessAlert } = AlertContextHook();
  const navigate = useNavigate();

  const carDeleteHandler = useCallback(async () => {
    setLoadingIndicator(true);
    try {
      await CarServices.deleteCar(carDelete.id);
      navigate(
        carData?.active === true ? ROUTES.ACTIVE_CARS : ROUTES.DEACTIVE_CARS
      );
    } catch (error) {
      postErrorAlert(error.message);
    }
    setLoadingIndicator(false);
  }, [carDelete]);

  const carActivityHandler = useCallback(async () => {
    setLoadingIndicator(true);
    try {
      let data;
      if (carActivityData?.active === true) {
        data = { active: false };
      } else {
        data = { active: true };
      }
      const response = await CarServices.updateCar(carActivityData.id, data);
      let successMsg;
      if (response?.active === false) {
        successMsg = 'User deactivated successfully';
      } else {
        successMsg = 'User activated successfully';
      }
      postSuccessAlert(successMsg);
      setCarData(response);
    } catch (error) {
      postErrorAlert(error.message);
    }
    setLoadingIndicator(false);
  }, [carActivityData]);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    const { signal } = abortController;

    const findCar = async () => {
      if (isMounted) {
        setLoadingIndicator(true);
      }
      try {
        const response = await CarServices.getCar(carId, signal);
        isMounted && setCarData(response);
      } catch (error) {
        if (isMounted) postErrorAlert(error.message);
      } finally {
        if (isMounted) {
          setLoadingIndicator(false);
        }
      }
    };

    findCar();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [carId]);

  return (
    <div className={PageStyles.contentWrapper}>
      {carActivityData && Object.keys(carActivityData).length > 0 && (
        <ConfirmPopup
          data={carActivityData}
          cancelBtnName={'cancel'}
          successBtnName={
            carActivityData?.active === true ? 'deactivate' : 'activate'
          }
          alertTitle={
            carActivityData?.active === true
              ? 'Confirm deactivation'
              : 'Confirm activate'
          }
          alertMessage={
            carActivityData?.active === true
              ? "Deactivated car can't provide service, do you want to deactivate this car?"
              : 'This is a deactivated car for some reason, do you want to activate this car ?'
          }
          handleClose={() => {
            setCarActivityData(null);
          }}
          handleOkey={carActivityHandler}
        />
      )}
      {carDelete && Object.keys(carDelete).length > 0 && (
        <ConfirmPopup
          data={carDelete}
          cancelBtnName={'cancel'}
          successBtnName={'Delete'}
          alertTitle={'Confirm Delete'}
          alertMessage={
            "Delete car can't provide service, do you want to delete this car?"
          }
          handleClose={() => {
            setCarDelete(null);
          }}
          handleOkey={carDeleteHandler}
        />
      )}
      <Loader isOpen={loadingIndicator} />
      <div className={PageStyles.titleSec}>
        <h2 className={PageStyles.title}>
          Car<span className={PageStyles.menuName}>Details</span>
        </h2>
      </div>
      <div className={PageStyles.searchPart}>
        <Breadcrumbs
          separator={<EastSharpIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            to={
              carData?.active === true
                ? ROUTES.ACTIVE_CARS
                : ROUTES.DEACTIVE_CARS
            }
            underline="hover"
            key="1"
            className={PageStyles.link}
          >
            {carData?.active === true ? 'Active Cars' : 'Deactive Cars'}
          </Link>
          <span key="2" className={PageStyles.activeLink}>
            Car Details
          </span>
        </Breadcrumbs>
        <div className={PageStyles.searchSec}>
          <input
            type="text"
            // value={searchText}
            // onChange={(e) => {
            //    handleSearch(e.target.value);
            // }}
            className={PageStyles.searchInput}
            placeholder="search items"
          />
          <SearchIcon className={PageStyles.searchIcon} />
        </div>
      </div>
      {carData ? (
        <CarDetailsPart
          data={carData}
          manageCarHandler={(data) => {
            setCarActivityData(data);
          }}
          deleteCarHandler={(data) => {
            setCarDelete(data);
          }}
        />
      ) : (
        <Info title={'No Car'} content={'You have no car with this id.'} />
      )}
    </div>
  );
}

export default CarDetails;
