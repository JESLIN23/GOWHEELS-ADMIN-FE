import React, { useState, useEffect } from 'react';
import ProtectRoute from '../../components/ProtectRoute';
import PersistLogin from '../../components/PersistLogin';

import styles from './UserPage.module.css';
import Loader from './../../utils/Loading/loading';
import Info from './../../utils/Alerts/Info';
import DataTable from '../../utils/DataTable/DataTable';
import ConfirmPopup from '../../utils/Alerts/ConfirmPopup';
import UserServices from '../../services/UserServices';
import SearchIcon from '@mui/icons-material/Search';

export default function UserPage() {
  return (
    <PersistLogin>
      <ProtectRoute>
        <User />
      </ProtectRoute>
    </PersistLogin>
  );
}

function User() {
  const [loadingIndicator, setLoadingIndicator] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [deleteData, setDeleteData] = useState();

  const handleDeleteClick = (data) => {
    setDeleteData(data);
  };

  const handleDeleteUser = () => {};

  const toggleDetailsTab = () => {};

  const headerData = [
    {
      id: 'id',
      label: 'Id',
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
      id: 'gender',
      label: 'Gender',
      type: 'text',
    },
    {
      id: 'date_of_birth',
      label: 'Date of birth',
      type: 'text',
    },
    {
      id: 'phone',
      label: 'Phone',
      type: 'text',
    },
    {
      id: 'isActive',
      label: 'Active',
      type: 'callback',
      viewStatus: (obj) => {
        return obj.isActive === true ? 'Yes' : 'No';
      },
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
      label: 'Delete',
      title: 'Delete',
      type: 'button',
      clickHandler: handleDeleteClick,
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

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      setLoadingIndicator(true);
      const res = await UserServices.getUsers();
      isMounted && setUsers(res);
      isMounted && setFilteredUsers(res);
      setLoadingIndicator(false);
    };
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    handleSearch(searchText);
  }, [users]);

  return (
    <div className={styles.contentWrapper}>
      <ConfirmPopup
        data={deleteData}
        cancelBtnName={'cancel'}
        successBtnName={'delete'}
        alertTitle={'Confirm delete'}
        alertMessage={
          "Deactivated user can't use your website, do you want to deactivate this user?"
        }
        handleClose={handleDeleteClick}
        handleOkey={handleDeleteUser}
      />
      <Loader isOpen={loadingIndicator} />
      <div className={styles.titleSec}>
        <h2 className={styles.title}>
          User<span className={styles.menuName}>Management</span>
        </h2>
      </div>
      <div className={styles.searchPart}>
        <div className={styles.searchSec}>
          <input
            type="text"
            value={searchText}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            className={styles.searchInput}
            placeholder="search items"
          />
          <SearchIcon className={styles.searchIcon} />
        </div>
      </div>
      {users ? (
        filteredUsers && filteredUsers.length ? (
          <DataTable
            columns={headerData}
            rows={filteredUsers ? filteredUsers : users}
          />
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
          content={
            'You have no customers to list with current filter configuration. Please clear the filters or add users'
          }
        />
      )}
    </div>
  );
}
