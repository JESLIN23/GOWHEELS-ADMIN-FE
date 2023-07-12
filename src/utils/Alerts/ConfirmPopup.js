import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function ConfirmPopup(props) {

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
        open={Boolean(data)}
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
            {cancelBtnName || 'cancel'}
          </Button>
          <Button
            onClick={() => {
              handleOkey(data);
              handleClose('');
            }}
            autoFocus
          >
            {successBtnName || 'success'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmPopup;
