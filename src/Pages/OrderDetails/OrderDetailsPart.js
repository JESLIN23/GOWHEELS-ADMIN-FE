import React from 'react';
import styles from './OrderDetails.module.css';
import { Grid, Paper, Box, Avatar, Button } from '@mui/material';
import PlaceHolderImage from '../../utils/PlaceHolderImage';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

function stringAvatar(name) {
  return {
    sx: {
      width: 140,
      height: 140,
      fontSize: 50,
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`.toUpperCase(),
  };
}

function OrderDetailsPart(props) {
  const {
    data,
    cancelOrder,
    closeOrder,
    activateOrder,
    finishOrder,
    goToPreviousPage,
  } = props;

  const orderHeaders = [
    'Pickup Date',
    'Dropoff Date',
    'Pickup Location',
    'Dropoff Location',
    'Status',
    'Amount Paid',
  ];
  const carHeaders = [
    'Brand',
    'Segment',
    'Fuel',
    'Seating Capacity',
    'Transmission',
    'City',
    'Registor No',
    'Price',
  ];
  const userHeaders = ['Name', 'Email', 'Phone'];

  return (
    <Box className={styles.carWrapper}>
      <Grid container rowSpacing={1} columnSpacing={2}>
        <Grid item xs={12} md={3}>
          <Item className={styles.carImg}>
            <Grid container rowSpacing={2}>
              <Grid item xs={6} md={12} className={styles.imgSep}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: 'grid', justifyItems: 'center' }}
                  >
                    <img
                      src={data?.car?.images[0]?.url || PlaceHolderImage}
                      style={{ height: 140, width: '90%' }}
                    />
                  </Grid>
                  <Grid item xs={6} className={styles.imgName}>
                    {data?.car?.brand}
                  </Grid>
                  <Grid item xs={6} className={styles.imgName}>
                    {data?.car?.name}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} md={12} className={styles.imgSep}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: 'grid', justifyItems: 'center' }}
                  >
                    <Avatar
                      src={data?.user?.avatar}
                      {...stringAvatar(
                        `${data?.user?.firstName} ${data?.user?.secondName}`
                      )}
                    />
                  </Grid>
                  <Grid item xs={6} className={styles.imgName}>
                    {data?.user?.firstName}
                  </Grid>
                  <Grid item xs={6} className={styles.imgName}>
                    {data?.user?.secondName}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Item>
        </Grid>
        <Grid item xs={12} md={9}>
          <Item className={styles.carInfoContainer}>
            <Grid container rowSpacing={1} columnSpacing={3}>
              <Grid item xs={12} className={styles.heading}>
                <span>Order Details</span>
              </Grid>
              <Grid item xs={4}>
                <Grid container rowSpacing={2}>
                  {(orderHeaders || []).map((header, index) => (
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
                    {data?.pickup_date}
                  </Grid>
                  <Grid item xs={12} className={styles.info2}>
                    {data?.dropoff_date}
                  </Grid>
                  <Grid item xs={12} className={styles.info1}>
                    {data?.pickup_location}
                  </Grid>
                  <Grid item xs={12} className={styles.info2}>
                    {data?.dropoff_location}
                  </Grid>
                  <Grid item xs={12} className={styles.info1}>
                    {data?.status}
                  </Grid>
                  <Grid item xs={12} className={styles.info2}>
                    {data?.amount}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={styles.heading}>
                <span>Car Details</span>
              </Grid>
              <Grid item xs={4}>
                <Grid container rowSpacing={2}>
                  {(carHeaders || []).map((header, index) => (
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
                    {data?.car?.brand}
                  </Grid>
                  <Grid item xs={12} className={styles.info2}>
                    {data?.car?.segment}
                  </Grid>
                  <Grid item xs={12} className={styles.info1}>
                    {data?.car?.fuel}
                  </Grid>
                  <Grid item xs={12} className={styles.info2}>
                    {data?.car?.seating_capacity}
                  </Grid>
                  <Grid item xs={12} className={styles.info1}>
                    {data?.car?.transmission}
                  </Grid>
                  <Grid item xs={12} className={styles.info2}>
                    {data?.car?.city}
                  </Grid>
                  <Grid item xs={12} className={styles.info1}>
                    {data?.car?.registerNo}
                  </Grid>
                  <Grid item xs={12} className={styles.info2}>
                    {data?.car?.price}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={styles.heading}>
                <span>User Details</span>
              </Grid>
              <Grid item xs={4}>
                <Grid container rowSpacing={2}>
                  {(userHeaders || []).map((header, index) => (
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
                    {`${data?.user?.firstName} ${data?.user?.secondName}`}
                  </Grid>
                  <Grid item xs={12} className={styles.info2}>
                    {data?.user?.email}
                  </Grid>
                  <Grid item xs={12} className={styles.info1}>
                    {data?.user?.phone}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} className={styles.carUpdate}>
                {!data?.closed && (
                  <>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={goToPreviousPage}
                    >
                      BACK
                    </Button>
                    {data?.status === 'pending' && (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={cancelOrder}
                      >
                        Cancel
                      </Button>
                    )}
                    {data?.status === 'pending' && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={activateOrder}
                      >
                        Activate
                      </Button>
                    )}
                    {data?.status === 'on-going' && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={finishOrder}
                      >
                        Finish
                      </Button>
                    )}
                    {(data?.status === 'completed' || data?.status === 'cancelled') && (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={closeOrder}
                      >
                        Close Order
                      </Button>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OrderDetailsPart;
