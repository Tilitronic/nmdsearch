import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './user/userSlice.js';
import queryReducer from './query/querySlice.js';
import dictsReduser from './sources/dictsSlice.js';
import parametersReduser from './parameters/parametersSlice.js';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  user: userReducer,
  query: queryReducer,
  dicts: dictsReduser,
  parameters: parametersReduser
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});



export const persistor = persistStore(store);