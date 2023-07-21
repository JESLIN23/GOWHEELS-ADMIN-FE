import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function Info(props) {
  const { title, content } = props;
  return (
    <Alert severity="info" style={{ marginTop: '15px',width: '100%' }}>
      <AlertTitle>{title}</AlertTitle>
      {content}
    </Alert>
  );
}

export default Info;
