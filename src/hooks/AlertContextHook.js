import {useContext} from 'react'
import AlertMessageContext from '../context/AlertMessageContext'

function AlertContextHook() {
  return useContext(AlertMessageContext)
}

export default AlertContextHook;