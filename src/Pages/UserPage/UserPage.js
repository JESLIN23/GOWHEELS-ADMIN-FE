import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate, createSearchParams } from 'react-router-dom';

import PageStyles from '../PageStyles.module.css';
import Loader from './../../utils/Loading/loading';
import Info from './../../utils/Alerts/Info';
import DataTable from '../../utils/DataTable/DataTable';
import ConfirmPopup from '../../utils/Alerts/ConfirmPopup';
import UserServices from '../../services/UserServices';
import SearchIcon from '@mui/icons-material/Search';
import AlertMessageContext from '../../context/AlertMessageContext';
import { ROUTES } from '../../const';
import { Paper, TablePagination } from '@mui/material';
// import UserDetails from '../../components/Popups/UserDetails/UserDetails';

export default function UserPage() {
  return (
      <User />
  );
}

function User() {
  const [loadingIndicator, setLoadingIndicator] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userActivityData, setUserActivityData] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [userManagement, setUserManagement] = useState(true);
  const [userCount, setUserCount] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  const [searchParams] = useSearchParams();
  const { postErrorAlert, postSuccessAlert } = useContext(AlertMessageContext);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPagination({ ...pagination, page: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({ ...pagination, page: 0, limit: +event.target.value });
  };

  useEffect(() => {
    const newParams = Object.fromEntries([...searchParams]);
    if (newParams?.active === 'false') {
      setUserManagement(false);
    } else {
      setUserManagement(true);
    }
    //  setUserManagement(searchParams.get('active'));
  }, [searchParams]);

  const handleUserClick = (data) => {
    setUserActivityData(data);
  };

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
        userActivityData._id,
        data
      );
      let successMsg;
      if (response?.active === false) {
        successMsg = 'User deactivated successfully';
      } else {
        successMsg = 'User activated successfully';
      }
      postSuccessAlert(successMsg);
      await getUsers();
    } catch (error) {
      postErrorAlert(error.message);
    }
    setLoadingIndicator(false);
  }, [userActivityData]);

  const toggleDetailsTab = (data) => {
    setUserDetails(data);
  };

  const activeUsersHeaderData = [
    {
      id: 'no',
      label: 'No',
      type: 'text',
    },
    {
      id: 'firstName',
      label: 'First Name',
      type: 'text',
    },
    {
      id: 'secondName',
      label: 'Second Name',
      type: 'text',
    },
    {
      id: 'email',
      label: 'Email',
      type: 'text',
    },
    {
      id: 'phone',
      label: 'Phone',
      type: 'text',
    },
    // {
    //   id: 'isActive',
    //   label: 'Active',
    //   type: 'callback',
    //   viewStatus: (obj) => {
    //     return obj.active === true ? 'Yes' : 'No';
    //   },
    // },
    {
      id: 'bookingDetails',
      label: 'Booking Details',
      type: 'rowClick',
      title: 'Details',
      clickHandler: toggleDetailsTab,
    },
    {
      id: 'deleteBtn',
      label: 'Deactive',
      title: 'Deactive',
      type: 'button',
      color: 'error',
      clickHandler: handleUserClick,
    },
  ];

  const deactiveUsersHeaderData = [
    {
      id: 'no',
      label: 'No',
      type: 'text',
    },
    {
      id: 'firstName',
      label: 'First Name',
      type: 'text',
    },
    {
      id: 'secondName',
      label: 'Second Name',
      type: 'text',
    },
    {
      id: 'email',
      label: 'Email',
      type: 'text',
    },
    {
      id: 'phone',
      label: 'Phone',
      type: 'text',
    },
    {
      id: 'bookingDetails',
      label: 'Booking Details',
      type: 'rowClick',
      title: 'Details',
      clickHandler: toggleDetailsTab,
    },
    {
      id: 'deleteBtn',
      label: 'Activate',
      title: 'Activate',
      type: 'button',
      color: 'success',
      clickHandler: handleUserClick,
    },
  ];

  const handleSearch = (value) => {
    setSearchText(value);
    let searchUsers = users
      ? users.filter(
          (user) =>
            user.firstName.toLowerCase().includes(value.toLowerCase()) ||
            user.secondName.toLowerCase().includes(value.toLowerCase()) ||
            user.phone.toString().includes(value)
        )
      : [];
    setFilteredUsers(searchUsers);
  };

  const getUsers = useCallback(async () => {
    setLoadingIndicator(true);
    try {
      let query;
      const paginationQuery = `&${createSearchParams(pagination)}`;
      if (userManagement === true) {
        query = `?active=true${paginationQuery}`;
      } else {
        query = `?active=false${paginationQuery}`;
      }
      const res = await UserServices.getAllUser(query);
      setUsers(res?.data?.document);
      setFilteredUsers(res?.data?.document);
      setUserCount(res?.results);
    } catch (error) {
      postErrorAlert(error.message);
    }
    setLoadingIndicator(false);
  }, [userManagement, pagination]);

  useEffect(() => {
    if (userDetails?._id) {
      navigate(ROUTES.USER_DETAILS.replace(':userId', userDetails._id));
    }
  }, [userDetails]);

  useEffect(() => {
    getUsers().then();
  }, [userManagement, pagination]);

  return (
    <div className={PageStyles.contentWrapper}>
      {Object.keys(userActivityData).length > 0 && (
        <ConfirmPopup
          data={userActivityData}
          cancelBtnName={'cancel'}
          successBtnName={
            userActivityData?.active === true ? 'Deactivate' : 'Activate'
          }
          alertTitle={
            userActivityData?.active === true
              ? 'Confirm delete'
              : 'Confirm Activate'
          }
          alertMessage={
            userActivityData?.active === true
              ? "Deactivated user can't use your website, do you want to deactivate this user ?"
              : 'This is a deactivated user, do you want to activate this user ?'
          }
          handleClose={handleUserClick}
          handleOkey={handleUserActivity}
        />
      )}
      <Loader isOpen={loadingIndicator} />
      <div className={PageStyles.titleSec}>
        <h2 className={PageStyles.title}>
          {userManagement ? `Active User` : `Deactive User`}
          <span className={PageStyles.menuName}>Management</span>
        </h2>
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
      {users && users.length ? (
        filteredUsers && filteredUsers.length ? (
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <DataTable
              columns={
                userManagement ? activeUsersHeaderData : deactiveUsersHeaderData
              }
              rows={filteredUsers ? filteredUsers : users}
            />
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={userCount}
              rowsPerPage={pagination.limit}
              page={pagination.page - 1}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        ) : (
          <Info
            title={'No customers to list'}
            content={
              'You have no customers to list with current filter configuration. Please clear the filters or add users'
            }
          />
        )
      ) : (
        <Info
          title={'No customers to list'}
          content={'You have no customers to list. Please add users'}
        />
      )}
      {/* {Object.keys(userDetails).length > 0 && (
        <UserDetails
          data={userDetails}
          handleClose={() => setUserDetails({})}
        />
      )} */}
    </div>
  );
}
