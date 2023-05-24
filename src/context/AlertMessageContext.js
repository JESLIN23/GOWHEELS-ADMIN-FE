import React, { createContext, useCallback, useState } from 'react';
import { nanoid } from 'nanoid';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const AlertMessageContext = createContext({});

export function AlertMessageProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  const postAlert = useCallback(
    (alert) => {
      setAlerts((alerts) => {
        alert.key = alert.key || nanoid();
        setTimeout(() => {
          setAlerts((alerts) => {
            return alerts.filter((m) => m.key !== alert.key);
          });
        }, 2000);
        return [...alerts, alert];
      });
    },
    [setAlerts]
  );
  const postErrorAlert = useCallback(
    (message) => {
      postAlert({ type: 'error', message });
    },
    [postAlert]
  );
  const postSuccessAlert = useCallback(
    (message) => {
      postAlert({ type: 'success', message });
    },
    [postAlert]
  );

  return (
    <AlertMessageContext.Provider value={{ postErrorAlert, postSuccessAlert }}>
      <AlertMessages alerts={alerts} />
      {children}
    </AlertMessageContext.Provider>
  );
}

function AlertMessages({ alerts }) {
  return (
    <Stack
      spacing={2}
      style={{ padding: 10, position: 'fixed', right: 0, zIndex: 99999 }}
    >
      {alerts.map((alert) => {
        return (
          <Alert key={alert.key} severity={alert.type}>
            {alert.message}
          </Alert>
        );
      })}
    </Stack>
  );
}

export default AlertMessageContext;
