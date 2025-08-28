import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Lang } from './constants';

i18n.use(initReactI18next).init({
  fallbackLng: Lang.RU,
});

export default i18n;
