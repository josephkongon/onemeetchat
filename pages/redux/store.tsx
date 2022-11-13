import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slice/userSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export { store };
