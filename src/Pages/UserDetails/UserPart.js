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
  }

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
                  src={data?.image}
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
                  style={{ fontWeight: 500, fontSize: 15 }}
                >
                  {data?.firstName}
                </Typography>
                <Typography
                  variant="overline"
                  display="block"
                  gutterBottom
                  style={{ fontWeight: 500, fontSize: 15 }}
                >
                  {data?.secondName}
                </Typography>
              </Grid>
            </Grid>
          </Item>
        </Grid>
        <Grid item xs={12} md={9}>
          <Item sx={{ padding: 2 }}>
            <Grid
              container
              rowSpacing={{ xs: 1, md: 3 }}
              columnSpacing={{ md: 2 }}
              className={styles.userInfo}
            >
              <Grid item xs={12} md={6} className={styles.userData}>
                <Grid container>
                  <Grid item xs={5}>
                    Email
                  </Grid>
                  <Grid item xs={7}>
                    : {data?.email}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} className={styles.userData}>
                <Grid container>
                  <Grid item xs={5}>
                    Phone
                  </Grid>
                  <Grid item xs={7}>
                    : {data?.phone}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} className={styles.userData}>
                <Grid container>
                  <Grid item xs={5}>
                    Date of birth
                  </Grid>
                  <Grid item xs={7}>
                    : {data?.date_of_birth}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} className={styles.userData}>
                <Grid container>
                  <Grid item xs={5}>
                    Gender
                  </Grid>
                  <Grid item xs={7}>
                    : {data?.gender}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} className={styles.userData}>
                <Grid container>
                  <Grid item xs={5}>
                    Email Verified
                  </Grid>
                  <Grid item xs={7}>
                    : {data?.isEmailVerified === true ? 'yes' : 'No'}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} className={styles.userData}>
                <Grid container>
                  <Grid item xs={5}>
                    Phone Verified
                  </Grid>
                  <Grid item xs={7}>
                    : {data?.isPhoneVerified === true ? 'yes' : 'No'}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={styles.userUpdate}>
                <Button variant="contained" color={data?.active ? 'error' : 'success'} onClick={handleUser}>{data?.active === true ? 'Deactive' : 'Activate'}</Button>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserPart;
