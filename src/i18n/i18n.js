
import en from './en';
import ar from './ar';
import ch from './ch';
import es from './es';
import fr from './fr';
import ht from './ht';
import pt from './pt';
import ru from './ru';
import vi from './vi';

let i18n = {
  i18n: {
    languages: [
      {
        language: 'en',
        title: 'English',
      },
      {
        language: 'ar',
        title: 'العربية',
      },
      {
        language: 'ch',
        title: '中文',
      },
      {
        language: 'es',
        title: 'Español',
      },
      {
        language: 'fr',
        title: 'Français',
      },
      {
        language: 'ht',
        title: 'Kreyòl Ayisyen',
      },
      {
        language: 'pt',
        title: 'Português',
      },
      {
        language: 'ru',
        title: 'Русский',
      },
      {
        language: 'vi',
        title: 'Tiếng Việt',
      },
    ],
    header: 'inside',
    enabled: true,
    selectorHidden: false,
    refinePanel: true,
    expandCollapseTitle: true,
    footer: true,
    data: {
      locale: 'en',
      messages: {
        en: en,
        ar: ar,
        ch: ch,
        es: es,
        fr: fr,
        ht: ht,
        pt: pt,
        ru: ru,
        vi: vi,
      },
    },
  },
};

// console.log('primary care i18n.js, i18n:', i18n);

export default i18n;
