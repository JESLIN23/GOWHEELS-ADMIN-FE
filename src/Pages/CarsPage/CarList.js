import React from 'react';
import styles from './CarsPage.module.css';
import { useNavigate } from 'react-router-dom';
import PlaceHolderImage from '../../utils/PlaceHolderImage';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid } from '@mui/material';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import AirlineSeatReclineExtraSharpIcon from '@mui/icons-material/AirlineSeatReclineExtraSharp';
import DirectionsCarFilledSharpIcon from '@mui/icons-material/DirectionsCarFilledSharp';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';

function CarListItem({ data, link, editHandler, deleteHandler }) {
  const navigate = useNavigate();

  const onEditButtonClicked = () => editHandler(data);
  const onDeleteButtonClicked = () => deleteHandler(data);
  const navigateToDetailsPage = () => navigate(link);

  const { name, brand, price, fuel, seating_capacity, transmission, segment } = data;

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.actionWrapper}>
        <EditIcon
          fontSize="small"
          color="disabled"
          onClick={onEditButtonClicked}
          className={styles.pointer}
        />
        <DeleteIcon
          fontSize="small"
          color="disabled"
          onClick={onDeleteButtonClicked}
          className={styles.pointer}
        />
      </div>
      <img
        src={data?.images[0]?.url || PlaceHolderImage}
        alt={data.name}
        className={styles.image}
        onClick={navigateToDetailsPage}
      />
      {name && (
        <span onClick={navigateToDetailsPage} className={styles.title}>
          {brand}  {name} 
        </span>
      )}
      <Grid container rowSpacing={1} columnSpacing={2}>
        <Grid item xs={6}>
          <Grid container columnSpacing={1} className={styles.specs}>
            <Grid item xs={3}>
              <LocalGasStationIcon sx={{ fontSize: 'small' }} />
            </Grid>
            <Grid item xs={9}>
              {fuel}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container columnSpacing={1} className={styles.specs}>
            <Grid item xs={3}>
              <AirlineSeatReclineExtraSharpIcon sx={{ fontSize: 'small' }} />
            </Grid>
            <Grid item xs={9}>
              {seating_capacity}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container columnSpacing={1} className={styles.specs}>
            <Grid item xs={3}>
              <DirectionsCarFilledSharpIcon sx={{ fontSize: 'small' }} />
            </Grid>
            <Grid item xs={9}>
              {segment}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container columnSpacing={1} className={styles.specs}>
            <Grid item xs={3}>
              <SettingsSharpIcon sx={{ fontSize: 'small' }} />
            </Grid>
            <Grid item xs={9}>
              {transmission}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {price && <span className={styles.price}>{price}</span>}
    </div>
  );
}

export default CarListItem;
