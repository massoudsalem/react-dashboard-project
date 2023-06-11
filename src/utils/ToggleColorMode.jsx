import React, { createContext, useMemo, useState } from 'react';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles';

export const ColorModeContext = createContext(null);

export const useColorMode = () => React.useContext(ColorModeContext);

const ToggleColorMode = ({ children }) => {
  const [mode, setMode] = useState(
    sessionStorage.getItem('color_mode') || 'light',
  );

  if (sessionStorage.getItem('color_mode') === null) {
    sessionStorage.setItem('color_mode', mode);
  }

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        sessionStorage.setItem('color_mode', newMode);
      },
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: sessionStorage.getItem('color_mode'),
          ...(sessionStorage.getItem('color_mode') === 'light'
            ? {
                primary: {
                  main: '#283593',
                },
                secondary: {
                  main: '#03a9f4',
                },
                error: {
                  main: '#f44336',
                },
                warning: {
                  main: '#ff9800',
                },
                info: {
                  main: '#2196f3',
                },
                success: {
                  main: '#4caf50',
                },
              }
            : {
                primary: {
                  main: '#2196f3',
                },
                secondary: {
                  main: '#1565c0',
                },
                error: {
                  main: '#c62828',
                },
                warning: {
                  main: '#ef6c00',
                },
                info: {
                  main: '#1565c0',
                },
                success: {
                  main: '#2e7d32',
                },
              }),
        },
      }),
    [mode],
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </StyledEngineProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;
