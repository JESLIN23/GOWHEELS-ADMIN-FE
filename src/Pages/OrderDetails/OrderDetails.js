import React, { useState, useEffect } from 'react';
import PageStyles from '../PageStyles.module.css';
import Loader from '../../utils/Loading/loading';

import Info from '../../utils/Alerts/Info';
import { useParams, useNavigate } from 'react-router-dom';
import AlertContextHook from '../../hooks/AlertContextHook';
import OrderServices from '../../services/OrderServices';
import ProtectRoute from '../../components/ProtectRoute';
import ConfirmPopup from '../../utils/Alerts/ConfirmPopup';
import OrderDetailsPart from './OrderDetailsPart';

export default function CarDetails() {
  return (
    <ProtectRoute>
      <CarDetailsPage />
    </ProtectRoute>
  );
}

function CarDetailsPage() {
  const [loadingIndicator, setLoadingIndicator] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [orderCancelConfirmation, setOrderCancelConfirmation] = useState(false);
  const [orderCloseConfirmation, setOrderCloseConfirmation] = useState(false);

  const { orderId } = useParams();
  const { postErrorAlert } = AlertContextHook();
  const navigate = useNavigate();

  const goToPreviousPage = () => {
    navigate(-1);
  };

  const closeOrder = async () => {
    setLoadingIndicator(true);
    try {
      await OrderServices.closeOrder(orderId);
      goToPreviousPage();
    } catch (error) {
      postErrorAlert(error.message);
    }
    setLoadingIndicator(false);
  };

  const cancelOrder = async () => {
    setLoadingIndicator(true);
    try {
      const res = await OrderServices.cancelOrder(orderId);
      setOrderData(res);
    } catch (error) {
      postErrorAlert(error.message);
    }
    setLoadingIndicator(false);
  };

  const activateOrder = async () => {
    setLoadingIndicator(true);
    try {
      const res = await OrderServices.updateOrder(orderId, {
        active: true,
        status: 'on-going',
      });
      setOrderData(res);
    } catch (error) {
      postErrorAlert(error.message);
    }
    setLoadingIndicator(false);
  };

  const finishOrder = async () => {
    setLoadingIndicator(true);
    try {
      const res = await OrderServices.updateOrder(orderId, {
        active: false,
        status: 'completed',
      });
      setOrderData(res);
    } catch (error) {
      postErrorAlert(error.message);
    }
    setLoadingIndicator(false);
  };

  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    const { signal } = abortController;

    const findCar = async () => {
      if (isMounted) {
        setLoadingIndicator(true);
      }
      try {
        const response = await OrderServices.getOrder(orderId, signal);
        isMounted && setOrderData(response);
      } catch (error) {
        if (isMounted) postErrorAlert(error.message);
      } finally {
        if (isMounted) {
          setLoadingIndicator(false);
        }
      }
    };

    findCar();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [orderId]);

  return (
    <div className={PageStyles.contentWrapper}>
      <Loader isOpen={loadingIndicator} />
      <div className={PageStyles.titleSec}>
        <h2 className={PageStyles.title}>
          Order<span className={PageStyles.menuName}>Details</span>
        </h2>
      </div>
      {orderCancelConfirmation && (
        <ConfirmPopup
          successBtnName={'confirm'}
          handleOkey={cancelOrder}
          data={'true'}
          handleClose={() => setOrderCancelConfirmation(false)}
          alertTitle={'Cancel Order'}
          alertMessage={
            'Are you shoure to cancel this order. After cancellation this order not be work.'
          }
        />
      )}
      {orderCloseConfirmation && (
        <ConfirmPopup
          successBtnName={'confirm'}
          handleOkey={closeOrder}
          data={'true'}
          handleClose={() => setOrderCloseConfirmation(false)}
          alertTitle={'Close Order'}
          alertMessage={
            'Are you shoure to close this order. Before closing this order check vehicle and make shoure everythig okey.'
          }
        />
      )}
      {orderData ? (
        <OrderDetailsPart
          data={orderData}
          closeOrder={() => setOrderCloseConfirmation(true)}
          cancelOrder={() => setOrderCancelConfirmation(true)}
          activateOrder={activateOrder}
          finishOrder={finishOrder}
          goToPreviousPage={goToPreviousPage}
        />
      ) : (
        !loadingIndicator && (
          <Info
            title={'No Order Found'}
            content={'You have no Order with this id.'}
          />
        )
      )}
    </div>
  );
}
