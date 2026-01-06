import type { InitOptions } from 'i18next'

export const LOCALE_COOKIE = 'i18next'

export const fallbackLng = 'en'
export const languages = [fallbackLng, 'zh'] as const
export const defaultNS = 'translation'
export const namespaces = [defaultNS, 'common'] as const

export type Locale = (typeof languages)[number]
export type Namespace = (typeof namespaces)[number]

export function getInitOptions(lng?: Locale) {
  return {
    supportedLngs: languages,
    // https://github.com/i18next/i18next/discussions/2035
    fallbackLng: false,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns: namespaces,
  } satisfies InitOptions
}
