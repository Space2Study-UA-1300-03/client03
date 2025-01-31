import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from '~/constants/translations'

export const supportedLngs = {
  en: 'English',
  ua: 'Українська'
}

const storedLanguage = localStorage.getItem('i18nextLng')

void i18n.use(initReactI18next).init({
  resources,
  lng: storedLanguage || 'en',
  ns: ['translations'],
  supportedLngs: Object.keys(supportedLngs),
  interpolation: {
    escapeValue: false
  },
  fallbackLng: 'en'
})

i18n.languages = ['en', 'ua']

export default i18n
