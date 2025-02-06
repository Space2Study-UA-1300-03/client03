import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

i18n.use(initReactI18next).init({
  lng: 'en',
  resources: { en: { translation: {} } },
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
})

vi.mock('react-i18next', async () => {
  return {
    useTranslation: () => ({
      t: (key) => key,
      i18n
    }),
    initReactI18next: {
      type: '3rdParty',
      init: () => {}
    }
  }
})
