import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import App from './App';
import theme from './theme';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <HashRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </LocalizationProvider>
    </HashRouter>
  </ThemeProvider>
);
