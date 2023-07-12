import React, { useEffect, useState } from 'react';
import PageStyles from '../PageStyles.module.css';
import { useNavigate, createSearchParams } from 'react-router-dom';
import Info from '../../utils/Alerts/Info';
import ProtectRoute from '../../components/ProtectRoute';
import Loader from '../../utils/Loading/loading';
import OrderServies from '../../services/OrderServices';
import { ROUTES } from '../../const';
import BookingPart from './BookingPart';

export default function BookingPage() {
  return (
    <ProtectRoute>
      <Booking />
    </ProtectRoute>
  );
}

function Booking() {
  const [loadingIndicator, setLoadingIndicator] = useState(false);
  const [bookings, setBookings] = useState(null);

  const navigate = useNavigate();

  const redirectToOrederDetails = (booking) => {
    navigate(ROUTES.ORDER_DETAILS.replace(':orderId', booking._id));
  };

  const findBookings = async () => {
    setLoadingIndicator(true);
    try {
      let query = `?${createSearchParams({ verified: false })}`;
      const resp = await OrderServies.getAllOrder(query);
      setBookings(resp);
    } catch (error) {
      console.error(error.message);
    }
    setLoadingIndicator(false);
  };

  useEffect(() => {
    findBookings();
  }, []);

  return (
    <div className={PageStyles.contentWrapper}>
      <Loader isOpen={loadingIndicator} />
      <div className={PageStyles.titleSec}>
        <h2 className={PageStyles.title}>
          {'Bookings'}
          <span className={PageStyles.menuName}>Management</span>
        </h2>
      </div>

      {bookings && bookings.length
        ? bookings.map((booking) => (
            <BookingPart
              key={bookings.id}
              data={booking}
              bookingDetails={redirectToOrederDetails}
            />
          ))
        : !loadingIndicator && (
            <Info
              title={'No bookings to list'}
              content={'You have no new bookings to list.'}
            />
          )}
    </div>
  );
}
