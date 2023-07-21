import React from 'react';
import styles from './TitleBar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import OrderContextHook from '../../hooks/OrderContextHook'

import { ROUTES } from '../../const';

// import Avatar from '@mui/material/Avatar';
// import PersonIcon from '@mui/icons-material/Person';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

function TitleBar() {
  const navigate = useNavigate()
  const { newOrderCount } = OrderContextHook()

  const redirectToBooking = () => {
    navigate('/booking')
  }
  return (
    <div className={styles.titleBarLayout}>
      <div className={styles.appHeading}>
        <Link
          to={ROUTES.DASHBOARD}
          style={{ textDecorationColor: 'transparent' }}
        >
          <span className={styles.logoTextColor}>GOWHEELS</span>
        </Link>
      </div>
      <div className={styles.actionButtons}>
        <div className={styles.notifications} onClick={redirectToBooking}>
          <Badge badgeContent={newOrderCount} color="primary">
            <NotificationsIcon color="action" style={{ color: '#fbfbfb', fontSize: '30px' }} />
          </Badge>
        </div>
        {/* <div className={styles.profileSec}>
          <span className={`${styles.iconHolder} ${styles.navIcon}`}>
            <Avatar style={{ backgroundColor: '#00cdb8' }}>
              <PersonIcon style={{ color: '#fff', fontSize: '25px' }} />
            </Avatar>
          </span>
        </div> */}
      </div>
    </div>
  );
}

export default TitleBar;
