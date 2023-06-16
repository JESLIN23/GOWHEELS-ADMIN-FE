import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';

import { ROUTES } from '../../const';
import PageStyles from '../PageStyles.module.css'
import Info from '../../utils/Alerts/Info';
import ConfirmPopup from '../../utils/Alerts/ConfirmPopup';
import Loader from '../../utils/Loading/loading';
import SearchIcon from '@mui/icons-material/Search';
import UserServices from '../../services/UserServices';
import AlertContextHook from '../../hooks/AlertContextHook';
import UserPart from './UserPart';
import { Breadcrumbs } from '@mui/material';
import EastSharpIcon from '@mui/icons-material/EastSharp';

function UserDetails() {
  const [loadingIndicator, setLoadingIndicator] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [userActivityData, setUserActivityData] = useState({});
  //  const [searchText, setSearchText] = useState('')
  //  const [filteredBookings, setFilteredBookings] = useState([])
  //  const [bookings, setBookings] = useState([])

  const { userId } = useParams();
  const { postErrorAlert, postSuccessAlert } = AlertContextHook();

  // const handleSearch = (value) => {
  //     setSearchText(value)
  //     let searchBooking = booking ? bookings.filter((booking) => booking.name.toLowerCase().includes(value.toLowerCase()))
  //     setFilteredBookings(searchBooking)
  // }

  const handleUserActivity = useCallback(async () => {
    setLoadingIndicator(true);
    try {
      let data;
      if (userActivityData?.active === true) {
        data = { active: false };
      } else {
        data = { active: true };
      }
      const response = await UserServices.updateUser(
        userActivityData.id,
        data
      );
      let successMsg;
      if (response?.active === false) {
        successMsg = 'User deactivated successfully';
      } else {
        successMsg = 'User activated successfully';
      }
      postSuccessAlert(successMsg);
      setCustomer(response);
    } catch (error) {
      postErrorAlert(error.message);
    }
    setLoadingIndicator(false);
  }, [userActivityData]);

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    const { signal } = abortController;

    const findUser = async () => {
      setLoadingIndicator(true);
      try {
        const response = await UserServices.getUser(userId, signal);
        isMounted && setCustomer(response);
      } catch (error) {
        if (isMounted) postErrorAlert(error.message);
      }
      setLoadingIndicator(false);
    };

    findUser().then();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [userId]);

  return (
    <div className={PageStyles.contentWrapper}>
      {Object.keys(userActivityData).length > 0 && (
        <ConfirmPopup
          data={userActivityData}
          cancelBtnName={'cancel'}
          successBtnName={
            userActivityData?.active === true ? 'deactivate' : 'activate'
          }
          alertTitle={
            userActivityData?.active === true
              ? 'Confirm deactivation'
              : 'Confirm activate'
          }
          alertMessage={
            userActivityData?.active === true
              ? "Deactivated user can't use your website, do you want to deactivate this user?"
              : 'This is a deactivated user, do you want to activate this user ?' 
          }
          handleClose={() => {
            setUserActivityData({});
          }}
          handleOkey={handleUserActivity}
        />
      )}
      <Loader isOpen={loadingIndicator} />
      <div className={PageStyles.titleSec}>
        <h2 className={PageStyles.title}>
          User<span className={PageStyles.menuName}>Details</span>
        </h2>
      </div>
      <div className={PageStyles.searchPart}>
        <Breadcrumbs
          separator={<EastSharpIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            to={
              customer?.active === true
                ? ROUTES.ACTIVE_USERS
                : ROUTES.DEACTIVE_USERS
            }
            underline="hover"
            key="1"
            className={PageStyles.link}
          >
            {customer?.active === true ? 'Active Users' : 'Deactive Users'}
          </Link>
          <span key="2" className={PageStyles.activeLink}>
            User Details
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
      {customer ? (
        <UserPart
          data={customer}
          handleManageUser={(data) => {
            setUserActivityData(data);
          }}
        />
      ) : (
        <Info
          title={'No customer'}
          content={'You have no customer with this id.'}
        />
      )}
    </div>
  );
}

export default UserDetails;
