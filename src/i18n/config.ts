import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from '../../public/locales/en/translation.json'
import it from '../../public/locales/it/translation.json'

export const supportedLanguages = ['it', 'en'] as const

export type AppLanguage = (typeof supportedLanguages)[number]

export const defaultLanguage: AppLanguage = 'it'

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      it: { translation: it },
      en: { translation: en },
    },
    fallbackLng: defaultLanguage,
    supportedLngs: [...supportedLanguages],
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    react: {
      useSuspense: false,
    },
  })

export default i18n
