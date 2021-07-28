import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './Routes/routes';

const theme = createTheme({
  typography: {
    fontFamily: ' Quicksand',
    h2: {
      fontSize: '1.375rem',
      fontWeight: 700,
      lineHeight: '22px',
      color: '#091936'
    },
    h4: {
      fontSize: '1.2375rem',
      fontWeight: 600,
      lineHeight: '22px',
      color: '#091936'
    },
    h3: {
      fontSize: '1.575rem',
      fontWeight: 700,
      lineHeight: '24px',
      color: '#050d38'
    }
  },

});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes/>
      <ToastContainer
        position="bottom-center"
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
    </ThemeProvider>
  );
}

export default App;
