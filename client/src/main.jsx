// Importing necessary dependencies and components
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.scss';
import { ChakraProvider } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { extendTheme } from '@chakra-ui/theme-utils';
import { ColorModeScript } from '@chakra-ui/color-mode';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { SocketContextProvider } from './context/SocketContext.jsx';

// Custom styles for the Chakra UI theme
const styles = {
  global: (props) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('gray.100', '#101010')(props),
    },
  }),
};

// Configuration for the Chakra UI theme
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

// Custom colors for the Chakra UI theme
const colors = {
  gray: {
    light: '#616161',
    dark: '#1e1e1e',
  },
};

// Creating a custom Chakra UI theme by extending the default theme
const theme = extendTheme({ config, styles, colors });

// Rendering the React app using ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById('root')).render(
  // React.StrictMode renders every component twice (in the initial render), only in development.
  <React.StrictMode>
    {/* Root component for Recoil state management */}
    <RecoilRoot>
      {/* Router component for handling navigation */}
      <BrowserRouter>
        {/* ChakraProvider for styling with the custom theme */}
        <ChakraProvider theme={theme}>
          {/* ColorModeScript for initializing the color mode based on the theme */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          {/* SocketContextProvider for managing WebSocket context */}
          <SocketContextProvider>
            {/* Main App component */}
            <App />
          </SocketContextProvider>
        </ChakraProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
