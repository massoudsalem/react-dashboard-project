import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, ...user } = action.payload;
      state.user = user;
      state.status = 'succeeded';
      state.error = null;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    logging: (state) => {
      state.status = 'loading';
    },
    error: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
});

export const { login, logging, error, logout } = authSlice.actions;

export default authSlice.reducer;
