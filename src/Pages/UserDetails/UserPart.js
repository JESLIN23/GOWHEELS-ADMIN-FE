import React from 'react';

import styles from './UserDetails.module.css';
import { Grid, Paper, Box, Avatar, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
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

function UserPart(props) {
  const { data, handleManageUser } = props;

  const handleUser = () => {
    handleManageUser(data);
  };

  const headers = ['Email', 'Phone No', 'Date of birth', 'Gender', 'Phone verified', 'Email verified']

  return (
    <Box className={styles.userWrapper}>
      <Grid container rowSpacing={1} columnSpacing={2}>
        <Grid item xs={12} md={3}>
          <Item sx={{ textAlign: 'center' }}>
            <Grid container rowSpacing={2} className={styles.userImg}>
              <Grid
                item
                xs={4}
                md={12}
                sx={{ display: 'grid', justifyItems: 'center' }}
              >
                <Avatar
                  src={data?.avatar}
                  {...stringAvatar(`${data?.firstName} ${data?.secondName}`)}
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
                  className={styles.userName}
                >
                  {data?.firstName}
                </Typography>
                <Typography
                  variant="overline"
                  display="block"
                  gutterBottom
                  className={styles.userName}
                >
                  {data?.secondName}
                </Typography>
              </Grid>
            </Grid>
          </Item>
        </Grid>
        <Grid item xs={12} md={9}>
          <Item className={styles.userInfoContainer}>
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
                    {data?.email}
                  </Grid>
                  <Grid item xs={12} className={styles.info2}>
                    {data?.phone}
                  </Grid>
                  <Grid item xs={12} className={styles.info1}>
                    {data?.date_of_birth}
                  </Grid>
                  <Grid item xs={12} className={styles.info2}>
                    {data?.gender}
                  </Grid>
                  <Grid item xs={12} className={styles.info1}>
                    {data?.isPhoneVerified === true ? 'Yes' : 'No'}
                  </Grid>
                  <Grid item xs={12} className={styles.info2}>
                    {data?.isEmailVerified === true ? 'Yes' : 'No'}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={styles.userUpdate}>
                <Button
                  variant="contained"
                  color={data?.active ? 'error' : 'success'}
                  onClick={handleUser}
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

export default UserPart;
