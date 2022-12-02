import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  urban: null,
  wordnet: null,
  babelnet: null,
  wiktionary: null,
  oxford: null,
  wordnik: null,
  meriam: null,
  words: null
};
export const dictsSlice = createSlice({
  name: 'dicts',
  initialState: {
    urban: null,
    wordnet: null,
    babelnet: null,
    wiktionary: null,
    oxford: null,
    wordnik: null,
    meriamC: null,
    meriamL: null,
    words: null


  },
  reducers: {
    updateUrban: (state, action) => {state.urban = action.payload;},
    removeUrban: (state) => (state.urban=null),
    updateDict: (state, action) => {state[action.payload.dict] = action.payload;},
    removeDict: (state, action) => (state[action.payload.dict]=null),
    resetDictsStore: () => (initialState),
  },
});

export const {
  updateDict, removeDict, resetDictsStore
} = dictsSlice.actions;

export default dictsSlice.reducer;