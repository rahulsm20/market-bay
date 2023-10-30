import { configureStore } from "@reduxjs/toolkit";
import itemReducer from './itemSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    itemData: itemReducer, 
    authData: authReducer
  },
});

export default store;