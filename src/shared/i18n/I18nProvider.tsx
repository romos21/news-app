import type { FC, PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './config';

export const I18nProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <I18nextProvider
      i18n={i18n}
      defaultNS='dictionary'
    >
      {children}
    </I18nextProvider>
  );
};
