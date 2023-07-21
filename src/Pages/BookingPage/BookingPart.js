import React from 'react';
import { Grid, Typography } from '@mui/material';
import styles from './bookings.module.css';
import { useNavigate } from 'react-router-dom';

function BookingPart(props) {
  const { data, cancelBooking, verifyBooking, link } = props;
  const navigate = useNavigate()

  const navigateToDetailsPage = () => navigate(link);
  return (
    <Grid item className={styles.bookingContainer}>
      <div className={styles.bookingInfo} onClick={navigateToDetailsPage}>
        <Grid container rowSpacing={1} columnSpacing={2}>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={4} className={styles.infoHeader}>
                <Typography variant="caption" gutterBottom>
                  User
                </Typography>
                <Typography variant="caption" gutterBottom>
                  :
                </Typography>
              </Grid>
              <Grid item xs={8} className={styles.info}>
                <Typography variant="caption" gutterBottom>
                  {`${data?.user?.firstName} ${data?.user?.secondName}` || ''}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={4} className={styles.infoHeader}>
                <Typography variant="caption" gutterBottom>
                  Car
                </Typography>
                <Typography variant="caption" gutterBottom>
                  :
                </Typography>
              </Grid>
              <Grid item xs={8} className={styles.info}>
                <Typography variant="caption" gutterBottom>
                  {`${data?.car?.brand} ${data?.car?.name}` || ''}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={4} className={styles.infoHeader}>
                <Typography variant="caption" gutterBottom>
                  City
                </Typography>
                <Typography variant="caption" gutterBottom>
                  :
                </Typography>
              </Grid>
              <Grid item xs={8} className={styles.info}>
                <Typography variant="caption" gutterBottom>
                  {data?.city || ''}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={4} className={styles.infoHeader}>
                <Typography variant="caption" gutterBottom>
                  Amount
                </Typography>
                <Typography variant="caption" gutterBottom>
                  :
                </Typography>
              </Grid>
              <Grid item xs={8} className={styles.info}>
                <Typography variant="caption" gutterBottom>
                  {data?.amount || ''}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4} className={styles.infoHeader}>
                <Typography variant="caption" gutterBottom>
                  Pickup Date
                </Typography>
                <Typography variant="caption" gutterBottom>
                  :
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="caption" gutterBottom>
                  {data?.pickup_date || ''}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4} className={styles.infoHeader}>
                <Typography variant="caption" gutterBottom>
                  Dropoff Date
                </Typography>
                <Typography variant="caption" gutterBottom>
                  :
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="caption" gutterBottom>
                  {data?.dropoff_date || ''}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className={styles.booingActions}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid
                item
                xs={6}
                className={styles.cancelBtn}
                onClick={() => {
                  cancelBooking(data);
                }}
              >
                Cancel
              </Grid>
              <Grid
                item
                xs={6}
                className={styles.successBtn}
                onClick={() => {
                  verifyBooking(data._id);
                }}
              >
                Verify
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}

export default BookingPart;
