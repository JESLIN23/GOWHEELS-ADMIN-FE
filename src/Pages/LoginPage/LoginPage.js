import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './LoginPage.module.css';
import Loader from '../../utils/Loading/loading';
import { ROUTES } from '../../const';
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
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function LoginPage() {
  const [loginData, setLoginData] = useState({});
  const [dataError, setDataError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { initiateLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const userLoginHandler = async () => {
    const _error = {};
    if (!loginData.username) {
      _error.username = 'Username is mandatory';
    }
    if (!loginData.password) {
      _error.password = 'Password is mandatory';
    }

    setDataError(_error);
    if (Object.keys(_error).length) {
      return;
    }
    setIsLoading(true);
    try {
      await initiateLogin(loginData);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      console.error(error);
      setDataError({
        ...dataError,
        password: 'Username or password is incorrect',
      });
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.login}>
          <h2>LOGIN</h2>
          <Grid container xs={12}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                placeholder="Enter Username"
                name="email"
                defaultValue={loginData.username || ''}
                onChange={(username) =>
                  setLoginData({ ...loginData, username })
                }
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                type="email"
                className={styles.input}
                error={dataError.username}
                helperText={
                  dataError.username ? 'Please enter a valid email' : ''
                }
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
                  defaultValue={loginData.password || ''}
                  onChange={(password) =>
                    setLoginData({ ...loginData, password })
                  }
                  variant="outlined"
                  sx={{ mb: 2 }}
                  type={showPassword ? 'text' : 'password'}
                  className={styles.input}
                  error={dataError.password}
                  helperText={dataError.password ? 'Password is incorrect' : ''}
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
              </FormControl>
            </Grid>
          </Grid>
          <div className={styles.btn}>
            <Button
              className={styles.btn}
              onClick={userLoginHandler}
              type="submit"
              disabled={isLoading}
              fullWidth
            >
              <Loader isLoading={isLoading} />
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
