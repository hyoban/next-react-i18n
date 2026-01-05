'use client'

import type { i18n, Resource } from 'i18next'
import type { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'

import { createClientI18nInstanceSync } from './client'
import type { Locale } from './settings'

interface I18nProviderProps {
  children: ReactNode
  locale: Locale
  resources: Resource
  fallback?: ReactNode
}

let cachedI18nInstance: i18n | null = null

export function I18nProvider({
  children,
  locale,
  resources,
}: I18nProviderProps) {
  if (!cachedI18nInstance || cachedI18nInstance.language !== locale) {
    cachedI18nInstance = createClientI18nInstanceSync(locale, resources)
  }

  return <I18nextProvider i18n={cachedI18nInstance}>{children}</I18nextProvider>
}
