import React from 'react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import PlaceHolderImage from '../../utils/PlaceHolderImage';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import LocationCityIcon from '@mui/icons-material/LocationCity';

function OnServiceCarListItem({ data, link }) {
  const navigate = useNavigate();
  const { car, pickup_date, dropoff_date, status } = data;
  const navigateToDetailsPage = () => navigate(link);

  const getFooterColor = () => {
    if (status === 'pending') {
      return 'rgba(126, 126, 126, .5)'
    } else if (status === 'on-going') {
      return 'rgba(0, 128, 0, .5)'
    } else if (status === 'completed') {
      return 'rgba(24, 119, 109, .5)'
    } else if (status === 'cancelled') {
      return 'rgba(136, 0, 0, .5)'
    }
  }

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardContent}>
        <img
          src={data?.car?.images[0]?.url || PlaceHolderImage}
          alt={car.name}
          className={styles.image}
          onClick={navigateToDetailsPage}
        />
        {car.name && (
          <span onClick={navigateToDetailsPage} className={styles.title}>
            {car?.brand} {car?.name}
          </span>
        )}
        <Grid container rowSpacing={1} columnSpacing={2}>
          <Grid item xs={6}>
            <Grid container columnSpacing={1} className={styles.specs}>
              <Grid item xs={3}>
                <FormatListNumberedIcon sx={{ fontSize: 'small' }} />
              </Grid>
              <Grid item xs={9}>
                {car?.registerNo}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container columnSpacing={1} className={styles.specs}>
              <Grid item xs={3}>
                <LocationCityIcon sx={{ fontSize: 'small' }} />
              </Grid>
              <Grid item xs={9}>
                {car?.city}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={2}>
          <Grid item xs={12}>
            <Grid container columnSpacing={1} className={styles.specs}>
              <Grid item xs={2}>
                <EventAvailableIcon sx={{ fontSize: 'small' }} />
              </Grid>
              <Grid item xs={10}>
                {pickup_date}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container columnSpacing={1} className={styles.specs}>
              <Grid item xs={2}>
                <EventBusyIcon sx={{ fontSize: 'small' }} />
              </Grid>
              <Grid item xs={10}>
                {dropoff_date}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className={styles.footer} style={{ backgroundColor: getFooterColor()}} >
        <span>{status}</span>
      </div>
    </div>
  );
}

export default OnServiceCarListItem;

