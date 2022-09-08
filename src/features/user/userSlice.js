import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {user: null,
    history: [],
  },
  reducers: {
    update: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = action.payload
    },
    remove: (state) => {
      state.user = null;
      state.history=[];
    },
    updateHistory: (state, action)=>{
        if(state.user){state.history = action.payload}
    },
    removeHistory: (state) => {
        state.history=[]; 
    }
  },
})

// Action creators are generated for each case reducer function
export const { update, remove, updateHistory, removeHistory} = userSlice.actions

export default userSlice.reducer

