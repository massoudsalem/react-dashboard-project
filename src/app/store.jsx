import { configureStore } from '@reduxjs/toolkit';
import { fakeStoreApi } from '../services/FakeStore';

export const store = configureStore({
  reducer: {
    [fakeStoreApi.reducerPath]: fakeStoreApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fakeStoreApi.middleware),
});
