import { useContext } from 'react';
import OrderContext from '../context/OrderContext';

function OrderContextHook() {
  return useContext(OrderContext);
}

export default OrderContextHook;
