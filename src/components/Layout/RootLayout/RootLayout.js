import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './RootLayout.module.css';
import TitleBar from '../../../utils/TitleBar/TitleBar';
import NaveBar from '../../../utils/NaveBar/NaveBar';

function RootLayout() {
  return (
    <>
      <TitleBar />
      <div className={styles.ContentsWrapper}>
        <div className={styles.NavBarWrapper}>
          <NaveBar />
        </div>
        <div className={styles.ContentsArea}>
          <div className={styles.ContentsView}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default RootLayout;
