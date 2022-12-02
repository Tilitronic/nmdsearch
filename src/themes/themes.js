import { AppBar, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const black = '#010101';
const grey = '#1b1b1b';
const white = '#ffffff';
const maroon = '#800000';
const cyanBlue = '#003480';
const electricYellow = '#ffff33';
const magenda = '#ff33ff';
const cyan = '#33ffff';
const mediumGreen = '#008026';
const greyscale = '#404040';
const invMaroon= '#7fffff';
const babyPowder = '#fefefa';

export const mainTheme = createTheme({
  palette: {
    type: 'dark',
    // common: {
    //   black: '#000',
    //   white: '#fff'
    // },
    primary: {
      main: electricYellow,
      contrastText: black,
    },
    secondary: {
      main: magenda,
      contrastText: black
    },
    background: {
      default: black,
      paper: greyscale,
    },
    iconButton:{
      main: babyPowder,
    },
    divider: '#fff',
    color1: grey,
    color2: mediumGreen,
    black: black,
    white: babyPowder,
    synBBC: electricYellow,
    defBBC: magenda,
    exampBBC: cyan,
    bodyBBC: white,
    text: {
      primary: babyPowder,
      secondary: cyan,//yellow
      disabled: greyscale//green
    },
    // action: {
    //   active: rgba(0, 0, 0, 0.54),
    //   hover: rgba(0, 0, 0, 0.04),
    //   hoverOpacity: 0.04,
    //   selected: rgba(0, 0, 0, 0.08),
    //   selectedOpacity: 0.08,
    //   disabled: rgba(0, 0, 0, 0.26),
    //   disabledBackground: rgba(0, 0, 0, 0.12),
    //   disabledOpacity: 0.38,
    //   focus: rgba(0, 0, 0, 0.12),
    //   focusOpacity: 0.12,
    //   activatedOpacity: 0.12,
    // },
    background1: {
      default: '#000000',
      main: '#000000',
      contrastText: '#fff',
    },
    background2: {
      default: '#76ff03',
      main: '#76ff03',
      contrastText: '#000000',
      paper: '#76ff03'
    },
  },
  shape: {
    borderRadius: 0,
  },
  components:{
    // MuiTextField: {
    //   styleOverrides:{
    //     root: {
    //       backgroundColor: black,
    //       border: '#fff 1px',
    //       color: babyPowder
    //     }
    //   }
    // },
    MuiAppBar: {
      styleOverrides:{
        root: {
          backgroundColor: black,
          border: '#ffffff 3px',
          color: '#fff'
        }
      }
    },
    MuiAccordion: {
      styleOverrides:{
        root: {
          backgroundColor: black,
          border: '1px',
          width: '70%',
        },

      }
    },
    MuiCheckbox:{
      styleOverrides:{
        // root: {
        //   color: electricYellow,
        // },
        colorPrimary: {
          color: magenda,
        },
        colorSecondary: {
          color: electricYellow,
        },

      }
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          // backgroundColor: greyscale,
          border: '3px',
          color: '#fff'
        }
      }
    },
    // MuiTextField: {
    //   styleOverrides: {
    //     root: {

    //     }
    //   }
    // },
    // MuiFilledInput: {
    //   styleOverrides: {
    //     root: {
    //       border: '1px solid #000000',
    //       backgroundColor: '#000000'
    //     },
    //     hover: {
    //       backgroundColor: '#000000'
    //     },
    //     focused: {
    //       backgroundColor: '#000000'

    //     }
    //   }
    // },
  },
  typography: {
    displayColName: {
      backgroundColor: black,
      color: cyan,
      fontSize: '0.9rem',
      lineHeight: '0.90',
      fontWeight: 700
    },
    defBody: {
      backgroundColor: '#0000',
      color: '#fff'
    },
    defHead: {
      backgroundColor: '#0000',
      color: magenda,
      fontSize: '1.2rem',
      fontWeight: 500
    },
    defExamples: {
      backgroundColor: '#0000',
      color: '#DBD8E3',
      fontSize: '0.9rem',
      lineHeight: '1.1rem',
    },
    defAut: {
      backgroundColor: '#0000',
      color: '#03C4A1',
      fontSize: '0.7rem'
    },
    defRate: {
      backgroundColor: '#0000',
      color: '#03C4A1',
      fontSize: '0.7rem'
    },
    synonymsHead: {
      backgroundColor: '#0000',
      color: electricYellow,
      fontSize: '0.8rem'
    },
    parametres: {
      backgroundColor: '#0000',
      color: babyPowder,
      fontSize: '0.7rem',
      lineHeight: '0.7rem',
    },

  }
});