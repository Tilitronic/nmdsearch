import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice.js';
import queryReducer from './features/query/querySlice.js';
import dictsReduser from './features/sources/dictsSlice.js';
import parametresReduser from './features/parametres/parametresSlice.js';
 

export default configureStore({
    reducer: {
        user: userReducer,
        query: queryReducer,
        dicts: dictsReduser,
        parametres: parametresReduser,
    },
  });
