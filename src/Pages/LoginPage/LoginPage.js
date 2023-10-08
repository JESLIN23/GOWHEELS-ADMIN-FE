import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './LoginPage.module.css';
import Loader from '../../utils/Loading/loading';
// import userContextHook from '../../hooks/userContextHook';
// import AlertMessageContext from '../../context/AlertMessageContext';
import UserContext from '../../context/UserContext';

import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  FormHelperText,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function LoginPage() {
  const [data, setData] = useState({});
  const [dataError, setDataError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, initiateLogin } = useContext(UserContext);

  // const { initiateLogin } = userContextHook();
  // const { postErrorAlert } = useContext(AlertMessageContext);
  const from = '/dashboard';

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    navigate(from, { replace: true });

     //eslint-disable-next-line
  }, [user]);

  const userLoginHandler = async () => {
    const _error = {};
    if (!data.email) {
      _error.username = 'Username is mandatory';
    }
    if (!data.password) {
      _error.password = 'Password is mandatory';
    }

    setDataError(_error);
    if (Object.keys(_error).length) {
      return;
    }
    setIsLoading(true);
    try {
      await initiateLogin(data);
      navigate(from, { replace: true });
    } catch (error) {
      setDataError({ ...dataError, password: error.message });
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.login}>
          <h2>LOGIN</h2>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                label="Username"
                placeholder="Enter Username"
                name="email"
                defaultValue={data.email || ''}
                onChange={(email) =>
                  setData({ ...data, email: email.target.value })
                }
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                type="email"
                className={styles.input}
                error={Boolean(dataError.email)}
                helperText={dataError.email ? dataError.email : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  placeholder="Enter Your Password"
                  name="password"
                  defaultValue={data.password || ''}
                  onChange={(password) =>
                    setData({ ...data, password: password.target.value })
                  }
                  variant="outlined"
                  sx={{ mb: 2 }}
                  type={showPassword ? 'text' : 'password'}
                  className={styles.input}
                  error={Boolean(dataError.password)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                <FormHelperText
                  id="outlined-weight-helper-text"
                  error={Boolean(dataError.password)}
                >
                  {dataError.password ? dataError.password : ''}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <div className={styles.btn}>
            <Button
              onClick={userLoginHandler}
              type="submit"
              disabled={isLoading}
              fullWidth
            >
              Sign in
              <Loader isOpen={isLoading} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
