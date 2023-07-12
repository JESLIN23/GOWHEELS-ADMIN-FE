import React from 'react';
import styles from './CarDetails.module.css';
import { Grid, Paper, Box, Typography, Button } from '@mui/material';
import PlaceHolderImage from '../../utils/PlaceHolderImage';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

function CarDetailsPart(props) {
  const { data, manageCarHandler, deleteCarHandler } = props;

  const handleCar = () => {
    manageCarHandler(data);
  };
  const handleDelete = () => {
    deleteCarHandler(data);
  };

  const headers = [
    'Brand',
    'Segment',
    'Fuel',
    'Seating Capacity',
    'Transmission',
    'City',
    'Registor No',
    'Price',
    'Status',
  ];

  return (
    <Box className={styles.carWrapper}>
      <Grid container rowSpacing={1} columnSpacing={2}>
        <Grid item xs={12} md={3}>
          <Item className={styles.carImg}>
            <Grid container rowSpacing={2}>
              <Grid
                item
                xs={4}
                md={12}
                sx={{ display: 'grid', justifyItems: 'center' }}
              >
                <img
                  src={data?.images[0]?.url || PlaceHolderImage}
                  style={{ height: 140, width: '90%' }}
                />
              </Grid>
              <Grid
                item
                xs={8}
                md={12}
                sx={{ display: 'grid', alignItems: 'center' }}
              >
                <Typography
                  variant="overline"
                  display="block"
                  gutterBottom
                  className={styles.carName}
                >
                  {data?.brand}
                </Typography>
                <Typography
                  variant="overline"
                  display="block"
                  gutterBottom
                  className={styles.carName}
                >
                  {data?.name}
                </Typography>
              </Grid>
            </Grid>
          </Item>
        </Grid>
        <Grid item xs={12} md={9}>
          <Item className={styles.carInfoContainer}>
            <Grid container rowSpacing={1} columnSpacing={3}>
              <Grid item xs={4}>
                <Grid container rowSpacing={2}>
                  {(headers || []).map((header, index) => (
                    <Grid key={index} item xs={12} className={styles.header}>
                      <div>{header}</div>
                      <div>:</div>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={8}>
                <Grid container rowSpacing={2}>
                  <Grid item xs={12} className={styles.info1}>
                    {data?.brand}
                  </Grid>
                  <Grid item xs={12} className={styles.info2}>
                    {data?.segment}
                  </Grid>
                  <Grid item xs={12} className={styles.info1}>
                    {data?.fuel}
                  </Grid>
                  <Grid item xs={12} className={styles.info2}>
                    {data?.seating_capacity}
                  </Grid>
                  <Grid item xs={12} className={styles.info1}>
                    {data?.transmission}
                  </Grid>
                  <Grid item xs={12} className={styles.info2}>
                    {data?.city}
                  </Grid>
                  <Grid item xs={12} className={styles.info1}>
                    {data?.registerNo}
                  </Grid>
                  <Grid item xs={12} className={styles.info2}>
                    {data?.price}
                  </Grid>
                  <Grid item xs={12} className={styles.info1}>
                    {data?.active_bookings.length ? 'Booked' : 'Not Booked'}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={styles.carUpdate}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                >
                  delete
                </Button>
                <Button
                  variant="contained"
                  color={data?.active ? 'secondary' : 'success'}
                  onClick={handleCar}
                >
                  {data?.active === true ? 'Deactive' : 'Activate'}
                </Button>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CarDetailsPart;
