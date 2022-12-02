import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    history: [],
  },
  reducers: {
    update: (state, action) => {
      state.user = action.payload;
    },
    remove: (state) => {
      state.user = null;
      state.history=[];
    },
    updateHistory: (state, action) => {
      if(state.user){state.history = [action.payload, ...state.history];}
    },
    removeHistory: (state) => {
      state.history=[];
    }
  },
});

// Action creators are generated for each case reducer function
export const { update, remove, updateHistory, removeHistory } = userSlice.actions;

export default userSlice.reducer;

