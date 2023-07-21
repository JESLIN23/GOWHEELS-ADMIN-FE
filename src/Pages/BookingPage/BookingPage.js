import React, { useEffect, useState } from 'react';
import PageStyles from '../PageStyles.module.css';
import styles from './bookings.module.css';
import { createSearchParams } from 'react-router-dom';
import Info from '../../utils/Alerts/Info';
import ProtectRoute from '../../components/ProtectRoute';
import Loader from '../../utils/Loading/loading';
import OrderServies from '../../services/OrderServices';
import { ROUTES } from '../../const';
import BookingPart from './BookingPart';
import { Grid } from '@mui/material';
import ConfirmPopup from '../../utils/Alerts/ConfirmPopup';
import OrderServices from '../../services/OrderServices';
import OrderContextHook from '../../hooks/OrderContextHook';
import { Button } from '@mui/material';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAdd';
import CreateOrder from '../../components/Popups/CreateOrder';

export default function BookingPage() {
  return (
    <ProtectRoute>
      <Booking />
    </ProtectRoute>
  );
}

function Booking() {
  const { setNewOrderCount } = OrderContextHook();
  const [loadingIndicator, setLoadingIndicator] = useState(false);
  const [bookings, setBookings] = useState(null);
  const [cancelBookingData, setCancelBookingData] = useState(null);
  const [createNewOrder, setCreateNewOrder] = useState(false);

  const cancelBooking = async (data) => {
    setLoadingIndicator(true);
    try {
      await OrderServices.cancelOrder(data?._id);
      findNewBookings();
    } catch (error) {
      console.error(error);
    }
    setLoadingIndicator(false);
  };

  const verifyBooking = async (bookingId) => {
    setLoadingIndicator(true);
    try {
      await OrderServices.updateOrder(bookingId, { verified: true });
      findNewBookings();
    } catch (error) {
      console.error(error);
    }
    setLoadingIndicator(false);
  };

  const handleCreateOrderPopup = () => {
    setCreateNewOrder((prev) => !prev);
  };

  const findNewBookings = async () => {
    setLoadingIndicator(true);
    try {
      let query = `?${createSearchParams({ verified: false })}`;
      const resp = await OrderServies.getAllOrder(query);
      setBookings(resp);
      setNewOrderCount(resp.length);
    } catch (error) {
      console.error(error.message);
    }
    setLoadingIndicator(false);
  };

  useEffect(() => {
    findNewBookings();
  }, []);

  return (
    <div className={PageStyles.contentWrapper}>
      <Loader isOpen={loadingIndicator} />
      {cancelBookingData && (
        <ConfirmPopup
          successBtnName={'cancel order'}
          cancelBtnName={'close'}
          data={cancelBookingData}
          handleOkey={cancelBooking}
          handleClose={() => setCancelBookingData(null)}
          alertTitle={'Cancel Booking'}
          alertMessage={`Are you shoure to cancel this booking. If this cancellrd customer doesn't get service`}
        />
      )}
      <CreateOrder open={createNewOrder} handleClose={handleCreateOrderPopup} />
      <div className={PageStyles.titleSec}>
        <h2 className={PageStyles.title}>
          {'Booking'}
          <span className={PageStyles.menuName}>Management</span>
        </h2>
        <Button
          variant="contained"
          className={PageStyles.coloredBtn}
          onClick={handleCreateOrderPopup}
        >
          <NoteAddOutlinedIcon />
          Create Order
        </Button>
      </div>
      <Grid
        container
        rowGap={2}
        columnGap={2}
        className={styles.bookingsWrapper}
        style={{ marginTop: '10px' }}
      >
        {bookings && bookings.length
          ? bookings.map((booking) => (
              <BookingPart
                key={booking.id}
                data={booking}
                cancelBooking={(data) => setCancelBookingData(data)}
                link={ROUTES.BOOKING_DETAILS.replace(':orderId', booking.id)}
                verifyBooking={verifyBooking}
              />
            ))
          : !loadingIndicator && (
              <Info
                title={'No bookings to list'}
                content={'You have no new bookings to list.'}
              />
            )}
      </Grid>
    </div>
  );
}
