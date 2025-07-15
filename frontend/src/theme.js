import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6C63FF', // Unique purple
    },
    secondary: {
      main: '#FF6584', // Vibrant pink
    },
    background: {
      default: '#f4f6fb',
      paper: '#fff',
    },
    success: {
      main: '#43e97b',
    },
    error: {
      main: '#ff1744',
    },
  },
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif',
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 16,
  },
});

export default theme;
