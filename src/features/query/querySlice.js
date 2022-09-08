import { createSlice } from '@reduxjs/toolkit'

export const querySlice = createSlice({
name: 'query',
initialState: {
    query: '',
},
reducers: {
    update: (state, action) => {state.query = action.payload},
    remove: (state) => (state.query='')
},
})

export const { update, remove } = querySlice.actions;
export default querySlice.reducer;
