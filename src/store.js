import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice.js';
import queryReducer from './features/query/querySlice.js';

export default configureStore({
    reducer: {
        user: userReducer,
        query: queryReducer,
    },
  });
