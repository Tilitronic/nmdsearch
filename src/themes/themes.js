import { AppBar, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const mainTheme = createTheme({
    palette: {
        type: 'dark',
        common: {
          black: '#000',
          white: '#fff'
        },
        primary: {
          main: '#FB8B24',
          contrastText: '#fff'
        },
        secondary: {
          main: '#9A031E',
          contrastText: '#fff'
        },
        background: {
          default: '#000000',
          paper: '#0F4C5C',
        },
        divider: '#fff',
        color1: '#533463',
        text: {
          primary:'#fff',
          secondary: '#76ff03',//yellow
          disabled: '#76ff03'//green
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
        MuiTextField: {
          styleOverrides:{
            root: {
              backgroundColor: '#78002e',//pink
              border: '#fff 1px',
              color: '#fff'
            }
          }
        },
        MuiAppBar: {
          styleOverrides:{
            root: {
              backgroundColor: '#000',
              border: '#fff 1px',
              color: '#fff'
            }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            // backgroundColor: '#0000',
          }
        }
      }
    },
      typography: {
        subtitle2: {
          backgroundColor: '#9A031E',
          color: '#fff',
          fontSize: '0.9rem',
          lineHeight: '0.95',
        },
        defBody: {
          backgroundColor: '#0000',
          color: '#fff'
        },
        defHead: {
          backgroundColor: '#0000',
          color: '#0F4C5C',
          fontSize: '1.2rem',
          fontWeight: 500
        },
        defExamples: {
          backgroundColor: '#0000',
          color: '#DBD8E3',
          fontSize: '0.9rem',
          lineHeight: '0.95',
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
        }

      }
})