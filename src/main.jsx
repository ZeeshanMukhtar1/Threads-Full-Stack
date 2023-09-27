import React from 'react';
import ReactDOM from 'react-dom';
import {
  ChakraProvider,
  extendTheme,
  ColorModeScript,
  CSSReset,
} from '@chakra-ui/react';
import App from './App';
import { mode } from '@chakra-ui/theme-tools';

// Defineing my Chakra UI theme
const theme = extendTheme({
  config: {
    initialColorMode: 'dark', // Settting up the initial color mode to 'dark'
    useSystemColorMode: true, // Useing system color mode as a fallback
  },
  colors: {
    gray: {
      800: '#616161', // Customize gray color for dark mode
      900: '#1e1e1e', // Customize gray color for light mode
    },
  },
  styles: {
    global: (props) => ({
      body: {
        color: mode('gray.800', 'whiteAlpha.900')(props), // Define text color based on color mode
        bg: mode('gray.100', '#101010')(props), // Define background color based on color mode
      },
    }),
  },
});

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />{' '}
      {/* Initializing color mode */}
      <CSSReset /> {/* Reseting default CSS styles */}
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
