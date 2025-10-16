import { createTheme } from '@mui/material';

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#1976d2' },
      secondary: { main: '#42a5f5' },
      background: {
        default: mode === 'light' ? '#f0f0f0' : '#121212',
        paper: mode === 'light' ? '#fff' : '#1e1e1e',
      },
      text: {
        primary: mode === 'light' ? '#000' : '#fff',
        secondary: mode === 'light' ? '#555' : '#ccc',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: 'background-color 0.4s ease, color 0.4s ease',
            backgroundColor: mode === 'light' ? '#1976d2' : '#121212',
            color: mode === 'light' ? '#000' : '#fff',
          },
          '*': {
            transition: 'background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease',
          },
        },
      },
    },
  });
