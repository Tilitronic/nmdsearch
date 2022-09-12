import { createSlice } from '@reduxjs/toolkit'

export const dictsSlice = createSlice({
name: 'dicts',
initialState: {
    urban: null,
    wordnet: null,
    wiktionary: null,
    oxford: null,
    wordnik: null,
    meriam: null,
    words: null


},
reducers: {
    updateUrban: (state, action) => {state.urban = action.payload},
    removeUrban: (state) => (state.urban=null),
    updateDict: (state, action) => {state[action.payload.dict] = action.payload},
    removeDict: (state, action) => (state[action.payload.dict]=null),
},
})

export const { 
    updateDict, removeDict,
 } = dictsSlice.actions;

export default dictsSlice.reducer;