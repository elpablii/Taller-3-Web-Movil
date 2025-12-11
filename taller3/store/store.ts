import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import dataReducer from './slices/dataSlice';
import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    data: dataReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
