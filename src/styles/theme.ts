import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    primary: {
      main: '#91A6FF',
      contrastText: '#fff',
    },
    secondary: {
      main: '#045863',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 575,
      md: 991,
      lg: 1199,
      xl: 1679,
    },
  },
  typography: {
    fontFamily: [
      'Work Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
