import React, { useState } from 'react';
import Loader from '../../utils/Loading/loading';
import styles from './Popup.module.css';
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import OrderServices from '../../services/OrderServices';

function CreateOrder(props) {
  const { handleClose, open } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  const handleCreateOrder = async () => {
    setIsLoading(true);
    try {
      await OrderServices.createOrder(data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
    handleClose();
    setIsLoading(false);
  };

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Loader isOpen={isLoading} />
      <DialogTitle id="alert-dialog-title">
        {'Create New Order'}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid container className={styles.inputRow} alignItems="center">
          <Grid
            item
            xs={4}
            sm={4}
            spacing={2}
            justify="flex-end"
            className={styles.inputLabelContainer}
          >
            <h3 className={styles.inputLabel}>User Name</h3>
          </Grid>
          <Grid item xs={8} sm={8}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              value={data?.user}
              onChange={(e) => setData({ ...data, user_name: e.target.value })}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color='error' onClick={handleClose}>Close</Button>
        <Button variant="contained" onClick={handleCreateOrder}>
          Create Order
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateOrder;
