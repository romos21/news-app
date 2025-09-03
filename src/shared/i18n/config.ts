import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Lang } from './constants';
import en from './dictionary/en.json';
import ru from './dictionary/ru.json';

i18n.use(initReactI18next).init({
  fallbackLng: Lang.RU,
  defaultNS: 'common',
  resources: {
    en,
    ru,
  },
});

export default i18n;
