import React, { createContext, useMemo, useState } from 'react';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles';

export const ColorModeContext = createContext(null);

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
    () => createTheme({
      palette: {
        mode: sessionStorage.getItem('color_mode'),
        ...(sessionStorage.getItem('color_mode') === 'light'
          ? {
            primary: { main: '#999  ' },
          }
          : {
            primary: {
              main: '#f29999',
              contrastText: '#ddd',
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
