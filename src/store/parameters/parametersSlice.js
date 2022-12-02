import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { toCamelCase } from '../../utils';

const defoulUitState = {
  theme: 'Acid Dark',
  textResultFontFamily: 'sans',
  textResultFontSize: 20,
};

export const parametersSlice = createSlice({
  name: 'parameters',
  initialState: {
    ui: {
      theme: 'Acid Dark',
      themeCC:'acidDark',
      textResultFontFamily: 'Sans',
      textResultFontSize: 20,
    },

    sources: {
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
        parameters: {
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
        label: 'Meriam-Webster\'s Learners dic.',
        name: 'meriamL',
        key: nanoid(),
        checked: true
      },
      meriamC: {
        label: 'Meriam-Webster\'s Collegiate dic.',
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
  },

  reducers: {
    toggleDictState: (state, action) =>
    {state.sources[action.payload.dict].checked = !state.sources[action.payload.dict].checked;},

    removeDict: (state, action) => {state.sources[action.payload.dict]=false;},

    setTextResultFontFamily: (state, action) => {state.ui.textResultFontFamily=action.payload;},

    setTheme: (state, action) => {state.ui.theme=action.payload; state.ui.themeCC=toCamelCase(action.payload);},

    setTextResultFontSize: (state, action) => {state.ui.textResultFontSize=action.payload;},

    setDefoultUiParameters: (state ) => {state.ui=defoulUitState;},
  },
});

export const {
  toggleDictState,
  setTextResultFontFamily,
  setTheme,
  setTextResultFontSize,
  setDefoultUiParametres
} = parametersSlice.actions;


export default parametersSlice.reducer;