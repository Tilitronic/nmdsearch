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
    updateWordnet: (state, action) => {state.wordnet = action.payload},
    removeWordnet: (state) => (state.wordnet=null),
    updateWiktionary: (state, action) => {state.wiktionary = action.payload},
    removeWiktionary: (state) => (state.wiktionary=null),
    updateOxford: (state, action) => {state.oxford = action.payload},
    removeOxford: (state) => (state.oxford=null),
    updateWordnik: (state, action) => {state.wordnik = action.payload},
    removeWordnik: (state) => (state.wordnik=null),
    updateMeriam: (state, action) => {state.meriam = action.payload},
    removeMeriam: (state) => (state.meriam=null),
    updateWords: (state, action) => {state.words = action.payload},
    removeWords: (state) => (state.words=null),
    updateDict: (state, action) => {state[action.payload.dict] = action.payload},
    removeDict: (state, action) => (state[action.payload.dict]=null),
},
})

export const { 
    updateDict, removeDict,
    removeWords, updateWords,
    removeMeriam, updateMeriam,
    removeWordnik, updateWordnik,
    removeOxford, updateOxford,
    removeWiktionary, updateWiktionary,
    removeWordnet, updateWordnet,
    removeUrban, updateUrban
 } = dictsSlice.actions;

export default dictsSlice.reducer;