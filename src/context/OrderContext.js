import React, { createContext, useEffect, useState } from 'react';
import OrderServices from '../services/OrderServices';
import { createSearchParams } from 'react-router-dom';

const OrderContext = createContext({});

export const OrderProvider = ({ children }) => {
  const [newOrderCount, setNewOrderCount] = useState(0);

  const newOrders = async () => {
    try {
      let query = `?${createSearchParams({ verified: false })}`;
      const res = await OrderServices.getAllOrder(query);
      setNewOrderCount(res.length);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    newOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        newOrderCount,
        setNewOrderCount
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
