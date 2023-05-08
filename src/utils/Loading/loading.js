import React from 'react';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader(props) {
  return (
    <Backdrop open={props.isOpen} style={{ zIndex: 4 }}>
      <CircularProgress style={{ color: '#43d7c8' }} />
    </Backdrop>
  );
}
