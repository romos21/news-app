import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './router';
import './index.css';
import { I18nProvider } from '@/shared/i18n';
import { ThemeProvider } from '@/shared/ui/theme';
import { StoreProvider } from '@/shared/store';

createRoot(document.getElementById('root')!).render(
  <I18nProvider>
    <StoreProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StoreProvider>
  </I18nProvider>,
);
