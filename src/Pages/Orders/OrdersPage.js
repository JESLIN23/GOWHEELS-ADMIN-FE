import React, { useEffect, useState } from 'react';
import PageStyles from '../PageStyles.module.css';
import { useNavigate, createSearchParams } from 'react-router-dom';
import Info from '../../utils/Alerts/Info';
import DataTable from '../../utils/DataTable/DataTable';
import SearchIcon from '@mui/icons-material/Search';
import Loader from '../../utils/Loading/loading';
import OrderServies from '../../services/OrderServices';
import { ROUTES } from '../../const';
import AlertContextHook from '../../hooks/AlertContextHook';

export default function Orders() {
  return (
      <OrdersPage />
  );
}

function OrdersPage() {
  const [loadingIndicator, setLoadingIndicator] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [orders, setOrders] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});

  const { postErrorAlert } = AlertContextHook();
  const navigate = useNavigate();

  const toggleDetailsTab = (data) => {
    setOrderDetails(data);
  };

  const orderTableHeaders = [
    {
      id: 'orderId',
      label: 'Id',
      type: 'text',
    },
    {
      id: 'user_name',
      label: 'User',
      type: 'text',
    },
    {
      id: 'car.name',
      label: 'Car',
      type: 'text',
    },

    {
      id: 'city',
      label: 'City',
      type: 'text',
    },
    {
      id: 'pickup_date',
      label: 'Pickup Date',
      type: 'text',
    },
    {
      id: 'dropoff_date',
      label: 'Dropoff Date',
      type: 'text',
    },
    {
      id: 'status',
      label: 'Status',
      type: 'text',
    },
    {
      id: 'bookingDetails',
      label: 'Booking Details',
      type: 'rowClick',
      title: 'Details',
      clickHandler: toggleDetailsTab,
    },
  ];

  const getOrders = async () => {
    setLoadingIndicator(true);
    let response;
    try {
      if (searchText) {
        let query = `?${createSearchParams(searchText)}`;
        response = await OrderServies.getAllOrder(query);
      } else {
        response = await OrderServies.getAllOrder();
      }
    } catch (error) {
      postErrorAlert(error.message);
    }
    setOrders(response);
    setLoadingIndicator(false);
  };

  useEffect(() => {
    if (orderDetails?._id) {
      navigate(ROUTES.ORDERS_DETAILS.replace(':orderId', orderDetails?._id));
    }
  }, [orderDetails]);

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className={PageStyles.contentWrapper}>
      <Loader isOpen={loadingIndicator} />
      <div className={PageStyles.titleSec}>
        <h2 className={PageStyles.title}>
          {'Orders'}
          <span className={PageStyles.menuName}>Management</span>
        </h2>
      </div>
      <div className={PageStyles.searchPart}>
        <div></div>
        <div className={PageStyles.searchSec}>
          <input
            type="text"
            value={searchText?.search}
            onChange={(e) => {
              setSearchText({ search: e.target.value });
            }}
            className={PageStyles.searchInput}
            placeholder="search items"
          />
          <SearchIcon className={PageStyles.searchIcon} onClick={getOrders} />
        </div>
      </div>
      {orders && orders.length ? (
        <DataTable columns={orderTableHeaders} rows={orders} />
      ) : (
        !loadingIndicator && (
          <Info
            title={'No orders to list'}
            content={
              'You have no orders to list with current filter configuration. Please change the filters to get orders'
            }
          />
        )
      )}
    </div>
  );
}
