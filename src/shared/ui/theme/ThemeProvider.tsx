import type { FC, PropsWithChildren } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MUIThemeProvider
      theme={theme}
      defaultMode='light'
      noSsr
    >
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};
