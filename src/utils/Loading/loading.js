import React from 'react';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader({ isOpen, size }) {
  if (!isOpen) {
    return <></>;
  }

  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: 'absolute',
      }}
      open={true}
    >
      <CircularProgress
        size={size || 28}
        sx={{
          top: -6,
          left: -6,
          zIndex: 1,
          color: '#43d7c8',
        }}
      />
    </Backdrop>
  );
}
