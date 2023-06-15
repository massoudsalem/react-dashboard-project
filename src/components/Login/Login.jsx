//login page
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  Box,
  Alert,
  InputLabel,
  Button,
  Dialog,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { login, logging, error as errorAction } from '../../services/auth';
import { useLoginUserMutation } from '../../services/FakeApi';

const ErrorDialog = ({ open, setOpen, message }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Alert severity="error">{message}</Alert>
    </Dialog>
  );
};

const Login = () => {
  const { error } = useSelector((state) => state.auth);
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Box
      component="form"
      className="justify-center] mx-auto flex h-[50vh] w-80 flex-col gap-2"
      onSubmit={handleSubmit(async (data) => {
        dispatch(logging());
        try {
          const res = await loginUser(data).unwrap();
          dispatch(login(res));
          navigate('/');
        } catch (err) {
          dispatch(errorAction(err.data.message));
          setOpen(true);
        }
      })}
    >
      <InputLabel htmlFor="username">Username</InputLabel>
      <OutlinedInput
        id="username"
        type="username"
        {...register('username', { required: true })}
      />
      {errors.username && (
        <Alert severity="error">Please enter your email</Alert>
      )}
      <InputLabel htmlFor="password">Password</InputLabel>
      <OutlinedInput
        id="password"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        aria-hidden="true"
        {...register('password', { required: true })}
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
      />
      {errors.password && (
        <Alert severity="error">Please enter your password</Alert>
      )}
      <Button variant="contained" color="primary" type="submit">
        Login
      </Button>
      <ErrorDialog open={open} setOpen={setOpen} message={error} />
    </Box>
  );
};

export default Login;
