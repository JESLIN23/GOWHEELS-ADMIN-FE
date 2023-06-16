import React, { useContext } from 'react';
import styles from './NaveBar.module.css';
import { Link, useLocation, matchPath } from 'react-router-dom';

import NavConfig from './NavConfig';
import UserContext from '../../context/UserContext';

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Grid from '@mui/material/Grid';

function NaveBar() {
  const { initiateLogout } = useContext(UserContext);
  const { pathname } = useLocation();
  const match = (path) => (path ? matchPath(`${path}/*`, pathname) : false);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} className={styles.navBar}>
        {NavConfig.map((nav) => {
          return (
            <div
              className={`${styles.navLink} ${match(nav.path) ? styles.activeNavLink : null}`}
              key={nav.name}
            >
              <Link
                className={`${styles.navLinkWrapper} ${
                  match(nav.path) ? styles.activeNavLink : null
                }`}
                to={nav.path}
              >
                <nav.icon className={styles.icon}/>
                <h4 className={styles.navLinkText}>{nav.name}</h4>
              </Link>
              {nav.submenu &&
                match(nav.path) &&
                nav.submenu.map((subMenu) => {
                  return (
                    <Link
                      className={styles.navSubMenuItem}
                      key={subMenu.name}
                      to={subMenu.path}
                    >
                      <subMenu.icon className={styles.subMenuLinkIcon} />
                      <h5 className={styles.subMenuLink}>{subMenu.name}</h5>
                    </Link>
                  );
                })}
            </div>
          );
        })}

        <Link
          key="logout"
          className={styles.logoutWrapper}
          onClick={initiateLogout}
        >
          <LogoutOutlinedIcon  />
          <span className={styles.navLinkText}>Logout</span>
        </Link>
      </Grid>
    </Grid>
  );
}

export default NaveBar;
