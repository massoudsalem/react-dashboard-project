import { configureStore } from '@reduxjs/toolkit';
import { fakeStoreApi } from '../services/FakeStore';
import { fakeApi } from '../services/FakeApi';

export const store = configureStore({
  reducer: {
    [fakeStoreApi.reducerPath]: fakeStoreApi.reducer,
    [fakeApi.reducerPath]: fakeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fakeStoreApi.middleware, fakeApi.middleware),
});
