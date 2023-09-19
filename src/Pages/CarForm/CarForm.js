import React, { useEffect, useState } from 'react';
import PageStyles from '../PageStyles.module.css';
import Loader from '../../utils/Loading/loading';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../const';
import AlertContextHook from '../../hooks/AlertContextHook';
import TextInput from '../../utils/TextInput/TextInput';
import styles from './CarForm.module.css';

import {
  fuel,
  segment,
  seatingCapacity,
  brandNames,
  city,
  transmission,
} from './CarDataConfig';

import { Breadcrumbs, Grid, Button } from '@mui/material';
import EastSharpIcon from '@mui/icons-material/EastSharp';
import CarServices from '../../services/CarServices';
import ImagePanel from '../../components/ImagePanel/ImagePanel';
import SelectInput from '../../utils/SelectInput/SelectInput';

function CarForm() {
  const [carData, setCarData] = useState({});
  const [loadingIndicator, setLoadingIndicator] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [updateCar, setUpdateCar] = useState(null);
  const { postErrorAlert, postSuccessAlert } = AlertContextHook();
  const navigate = useNavigate();
  const { carId } = useParams();

  const _getData = () => {
    return {
      ...carData,
      images: (carData?.images || []).filter((image) => !image.file),
    };
  };

  const editCarHandler = async () => {
    setIsActionLoading(true);
    try {
      await CarServices.updateCar(carData.id, _getData());
      await uploadImages(carData.id, carData.images);
      resetForm();
      postSuccessAlert('Car Updated Successfully');
      moveToPreviousPage();
    } catch (error) {
      postErrorAlert(error.message);
    }
    setIsActionLoading(false);
  };

  const createCarHandler = async () => {
    setIsActionLoading(true);
    try {
      const createdCar = await CarServices.createCar(_getData());
      await uploadImages(createdCar.id, carData.images);
      resetForm();
      postSuccessAlert('Car Added Successfully');
      moveToPreviousPage();
    } catch (error) {
      postErrorAlert(error.message);
    }
    setIsActionLoading(false);
  };

  const uploadImages = async (carId, images) => {
    const imagesToUpload = images?.filter((image) => image.file);
    if (!imagesToUpload || !imagesToUpload.length) {
      return;
    }

    for (const image of imagesToUpload) {
      await CarServices.addCarImage(carId, image.file);
    }
  };

  const moveToPreviousPage = () => {
    if (updateCar && !updateCar.active) {
      navigate(ROUTES.DEACTIVE_CARS);
    } else {
      navigate(ROUTES.ACTIVE_CARS);
    }
  };

  const addNewImage = (image) => {
    const images = [...(carData.images || []), image];
    setCarData({ ...carData, images });
  };

  const removeImage = (imageId) => {
    const images = (carData.images || []).filter(
      (image) => image._id !== imageId
    );
    setCarData({ ...carData, images });
  };

  const formSubmitHandler = () => {
    carId ? editCarHandler() : createCarHandler();
  };

  const resetForm = () => {
    if (carId) {
      setCarData(updateCar)
    } else {
      setCarData(null);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    const { signal } = abortController;

    const findCar = async () => {
      setLoadingIndicator(true);
      try {
        const response = await CarServices.getCar(carId, signal);
        isMounted && setCarData(response);
        isMounted && setUpdateCar(response);
      } catch (error) {
        isMounted && postErrorAlert(error.message);
      }
      setLoadingIndicator(false);
    };

    carId && findCar().then();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [carId]);

  return (
    <div className={PageStyles.contentWrapper}>
      <Loader isOpen={loadingIndicator} />
      <div className={PageStyles.titleSec}>
        <h2 className={PageStyles.title}>
          {carId ? 'Edit' : 'Create'}
          <span className={PageStyles.menuName}>Car</span>
        </h2>
      </div>
      <div className={PageStyles.searchPart}>
        <Breadcrumbs
          separator={<EastSharpIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            to={
              carId
                ? (carData?.active === true)
                  ? ROUTES.ACTIVE_CARS
                  : ROUTES.DEACTIVE_CARS
                : ROUTES.ACTIVE_CARS
            }
            underline="hover"
            key="1"
            className={PageStyles.link}
          >
            {carId
              ? carData?.active === true
                ? 'Active Cars'
                : 'Deactive Cars'
              : 'Active Cars'}
          </Link>
          <span key="2" className={PageStyles.activeLink}>
            {carId ? 'Edit Car' : 'Create Car'}
          </span>
        </Breadcrumbs>
      </div>
      <ImagePanel
        images={carData?.images || []}
        addImage={addNewImage}
        removeImage={removeImage}
      />

      <Grid container rowSpacing={1} columnSpacing={{ xs: 0, md: 5 }}>
        <Grid
          item
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
          md={3}
          lg={2}
        >
          <div>Name</div>
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <TextInput
            variant="standard"
            value={carData?.name || ''}
            placeholder='Enter car name'
            onChange={(value) => setCarData({ ...carData, name: value })}
          />
        </Grid>
        <Grid
          item
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
          md={3}
          lg={2}
        >
          <div>Brand</div>
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <SelectInput
            label="Brand"
            value={carData?.brand || ''}
            name="brand"
            placeholder='Select car brand'
            onChange={(value) => setCarData({ ...carData, brand: value })}
            valueoptions={brandNames}
          />
        </Grid>
        <Grid
          item
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
          md={3}
          lg={2}
        >
          <div>City</div>
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <SelectInput
            label="City"
            value={carData?.city || ''}
            name="City"
            placeholder='Select city'
            onChange={(value) => setCarData({ ...carData, city: value })}
            valueoptions={city}
          />
        </Grid>
        <Grid
          item
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
          md={3}
          lg={2}
        >
          <div>Fuel</div>
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <SelectInput
            label="Fuel"
            value={carData?.fuel || ''}
            name="Fuel"
            placeholder='Select fuel type'
            onChange={(value) => setCarData({ ...carData, fuel: value })}
            valueoptions={fuel}
          />
        </Grid>
        <Grid
          item
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
          md={3}
          lg={2}
        >
          <div>Seating Capacity</div>
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <SelectInput
            label="Seating Capacity"
            value={carData?.seating_capacity?.toString() || ''}
            name="Seating Capacity"
            placeholder='Select seating capacity'
            onChange={(value) =>
              setCarData({ ...carData, seating_capacity: value })
            }
            valueoptions={seatingCapacity}
          />
        </Grid>
        <Grid
          item
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
          md={3}
          lg={2}
        >
          <div>Segment</div>
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <SelectInput
            label="Segment"
            value={carData?.segment || ''}
            name="Segment"
            placeholder='Select car segment'
            onChange={(value) => setCarData({ ...carData, segment: value })}
            valueoptions={segment}
          />
        </Grid>
        <Grid
          item
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
          md={3}
          lg={2}
        >
          <div>Transmission</div>
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <SelectInput
            label="Transmission"
            value={carData?.transmission || ''}
            name="Transmission"
            placeholder='Select transmission type'
            onChange={(value) =>
              setCarData({ ...carData, transmission: value })
            }
            valueoptions={transmission}
          />
        </Grid>
        <Grid
          item
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
          md={3}
          lg={2}
        >
          <div>Register No</div>
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <TextInput
            variant="standard"
            value={carData?.registerNo || ''}
            placeholder='Enter car registor number'
            onChange={(value) => setCarData({ ...carData, registerNo: value.toUpperCase() })}
          />
        </Grid>
        <Grid
          item
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
          md={3}
          lg={2}
        >
          <div>Price</div>
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <TextInput
            variant="standard"
            value={carData?.price?.toString() || ''}
            placeholder='Enter car price'
            onChange={(value) => setCarData({ ...carData, price: value })}
          />
        </Grid>

        <Grid item className={styles.subminBtnWrapper} xs={12}>
          <Button variant="contained" color="error" onClick={resetForm}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={formSubmitHandler}
          >
            Submin
            <Loader isOpen={isActionLoading} size={16} />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
export default CarForm;
