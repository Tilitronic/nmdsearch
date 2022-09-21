import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid';

export const parametresSlice = createSlice({
name: 'parametres',
initialState: {
    urban: {
        label: 'Urban dictionary',
        name: 'urban',
        key: nanoid(),
        checked: true 
    },
    wordnet: {
        label: 'WordNet',
        name: 'wordnet',
        key: nanoid(),
        checked: true,
    },
    wordnik: {
        label: 'Wordnik',
        name: 'wordnik',
        key: nanoid(),
        checked: true,
        parametres: {
            definition: true,
            pronunciations: true,
            audio: true,
            examples: true,
        } 
    },
    babelnet: {
        label: 'BabelNet',
        name: 'babelnet',
        key: nanoid(),
        checked: false,
    },
    // wiktionary: {
    //     label: 'Wiktionary',
    //     name: 'wiktionary',
    //     key: nanoid(),
    //     checked: false 
    // },
    // words: {
    //     label: 'Words',
    //     name: 'words',
    //     key: nanoid(),
    //     checked: false 
    // },
    // oxford: {
    //     label: 'Oxford dictionary',
    //     name: 'oxford',
    //     key: nanoid(),
    //     checked: false 
    // },
    // meriam: {
    //     label: 'Meriam-Webster',
    //     name: 'meriam',
    //     key: nanoid(),
    //     checked: false 
    // },
},
reducers: {
    toggleDictState: (state, action) => 
    {state[action.payload.dict].checked = !state[action.payload.dict].checked},

    removeDict: (state, action) => (state[action.payload.dict]=false),
},
})

export const { toggleDictState } = parametresSlice.actions;


export default parametresSlice.reducer;