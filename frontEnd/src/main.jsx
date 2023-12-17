import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme, ColorModeScript, CSSReset } from '@chakra-ui/react';
import App from './App';
import { mode } from '@chakra-ui/theme-tools';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

// Define your Chakra UI theme
const theme = extendTheme({
  config: {
    initialColorMode: 'dark', // Set the initial color mode to 'dark'
    useSystemColorMode: true, // Use system color mode as a fallback
  },
  colors: {
    gray: {
      light: '#616161', // Customize gray color for dark mode
      dark: '#1e1e1e', // Customize gray color for light mode
      white: '#ffffff',
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
    <RecoilRoot>
      <BrowserRouter>
        {' '}
        {/* Wrap your app with BrowserRouter */}
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} /> {/* Initialize color mode */}
          <CSSReset /> {/* Reset default CSS styles */}
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
);
