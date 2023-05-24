import { useContext } from 'react';
import UserContext from '../context/UserContext';

function userContextHook() {
  return useContext(UserContext);
}

export default userContextHook;
