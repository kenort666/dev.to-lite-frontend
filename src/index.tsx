import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import '../src/index.scss';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0000',
      dark: 'grey',
      light: '#000'
    },
    secondary: {
      main: '#3f51b5',
    },
    error: {
      main: '#d32f2f',
    },
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);
