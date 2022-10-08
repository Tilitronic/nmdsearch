import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid';

export const parametresSlice = createSlice({
name: 'parametres',
initialState: {
    urban: {
        label: 'Urban dic.',
        name: 'urban',
        key: nanoid(),
        checked: true 
    },
    wordnet: {
        label: 'WordNet',
        name: 'wordnet',
        key: nanoid(),
        checked: false,
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
            examples: false,
        } 
    },
    babelnet: {
        label: 'BabelNet',
        name: 'babelnet',
        key: nanoid(),
        checked: false,
    },
    meriamL: {
        label: "Meriam-Webster's Learners dic.",
        name: 'meriamL',
        key: nanoid(),
        checked: true 
    },
    meriamC: {
        label: "Meriam-Webster's Collegiate dic.",
        name: 'meriamC',
        key: nanoid(),
        checked: false 
    },
    //     oxford: {
    //     label: 'Oxford dic.',
    //     name: 'oxford',
    //     key: nanoid(),
    //     checked: false 
    // },
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


},
reducers: {
    toggleDictState: (state, action) => 
    {state[action.payload.dict].checked = !state[action.payload.dict].checked},

    removeDict: (state, action) => (state[action.payload.dict]=false),
},
})

export const { toggleDictState } = parametresSlice.actions;


export default parametresSlice.reducer;