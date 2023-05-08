import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

function ConfirmPopup(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const {
    successBtnName,
    cancelBtnName,
    handleOkey,
    handleClose,
    data,
    alertTitle,
    alertMessage,
  } = props;

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={data}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{alertTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{alertMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              handleClose('');
            }}
            color="primary"
          >
            {cancelBtnName}
          </Button>
          <Button
            onClick={() => {
              handleOkey(data);
              handleClose('');
            }}
            autoFocus
          >
            {successBtnName}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmPopup;
