import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import styles from './UserDetails.module.css';
import Info from '../../utils/Alerts/Info';
import ConfirmPopup from '../../utils/Alerts/ConfirmPopup';
import Loader from '../../utils/Loading/loading';
import SearchIcon from '@mui/icons-material/Search';
import UserServices from '../../services/UserServices';
import AlertContextHook from '../../hooks/AlertContextHook';
import UserPart from './UserPart';

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
      const response = await UserServices.updateUser(userActivityData._id, data);
      let successMsg;
      if (response?.active === false) {
        successMsg = 'User deactivated successfully';
      } else {
        successMsg = 'User activated successfully';
      }
      postSuccessAlert(successMsg);
      setCustomer(response)
    } catch (error) {
      console.log(error);
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
  }, []);

  return (
    <div className={styles.contentWrapper}>
      {Object.keys(userActivityData).length > 0 && (
        <ConfirmPopup
          data={userActivityData}
          cancelBtnName={'cancel'}
          successBtnName={'delete'}
          alertTitle={'Confirm delete'}
          alertMessage={
            "Deactivated user can't use your website, do you want to deactivate this user?"
          }
          handleClose={() => {
            setUserActivityData({});
          }}
          handleOkey={handleUserActivity}
        />
      )}
      <Loader isOpen={loadingIndicator} />
      <div className={styles.titleSec}>
        <h2 className={styles.title}>
          User<span className={styles.menuName}>Details</span>
        </h2>
      </div>
      <div className={styles.searchPart}>
        <div className={styles.searchSec}>
          <input
            type="text"
            // value={searchText}
            // onChange={(e) => {
            //    handleSearch(e.target.value);
            // }}
            className={styles.searchInput}
            placeholder="search items"
          />
          <SearchIcon className={styles.searchIcon} />
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
