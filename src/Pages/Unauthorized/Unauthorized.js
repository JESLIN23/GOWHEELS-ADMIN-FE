import React from 'react';
import { useNavigate } from 'react-router-dom';

import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import Button from '@mui/material/Button';

import styles from './Unauthorized.module.css';

function Unauthorized() {
  const navigate = useNavigate()
  return (
    <div className={styles.wrapper}>
      <NoAccountsIcon className={styles.icon} />
      <h2 className={styles.heading}>Unauthorized</h2>
      <Button variant="contained" style={{mt: 15, backgroundColor: "#00cdb8", color: 'white' }} onClick={() => navigate('login')} >
        Go Back
      </Button>
    </div>
  );
}

export default Unauthorized;
