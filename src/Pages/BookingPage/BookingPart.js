import React from 'react';
import { Grid } from '@mui/material';
import styles from './bookings.module.css';

function BookingPart(props) {
  const { data, bookingDetails } = props;
  
  const moveToDetailsPage = () => {
    bookingDetails(data);
  };
  return (
    <Grid
      container
      className={styles.bookingContainer}
      onClick={moveToDetailsPage}
    ></Grid>
  );
}

export default BookingPart;
