import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './UserLayout.module.css'

function UserLayout() {
  return (
    <div className={styles.containe}>
      <Outlet />
    </div>
  );
}

export default UserLayout;
