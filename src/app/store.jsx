import { configureStore } from '@reduxjs/toolkit';
import { fakeStoreApi } from '../services/FakeStore';
import { fakeApi } from '../services/FakeApi';
import authSlice from '../services/auth';

export const store = configureStore({
  reducer: {
    [fakeStoreApi.reducerPath]: fakeStoreApi.reducer,
    [fakeApi.reducerPath]: fakeApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fakeStoreApi.middleware, fakeApi.middleware),
});
