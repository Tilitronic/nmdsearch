import { createSlice } from '@reduxjs/toolkit';


export const querySlice = createSlice({
  name: 'query',
  initialState: {
    query: '',
    history:[],
  },
  reducers: {
    updateQuery: (state, action) => {state.query = action.payload;},
    removeQuery: (state) => (state.query=''),
    updateQueryHistory: (state, action) => {state.history = [action.payload, ...state.history];},
    removeQueryHistory:  (state) => (state.history=[])
  },
});

export const { updateQuery, removeQuery, updateQueryHistory,  removeQueryHistory } = querySlice.actions;
export default querySlice.reducer;
