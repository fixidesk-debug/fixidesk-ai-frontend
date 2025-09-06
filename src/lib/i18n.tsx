import { createI18n } from 'next-international'
import { i18n } from './i18n-config'

export const useI18n = createI18n(i18n)
export const I18nProvider = createI18n(i18n).Provider
