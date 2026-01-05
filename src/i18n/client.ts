import type { i18n, Resource } from 'i18next'
import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'

import type { Locale } from './settings'
import { getInitOptions } from './settings'

function getBackend() {
  return {
    type: 'backend' as const,
    init() {},
    read(language: string, namespace: string, callback: (err: unknown, data?: unknown) => void) {
      import(`../locales/${language}/${namespace}.json`)
        .then(data => callback(null, data.default ?? data))
        .catch(callback)
    },
  }
}

export function createClientI18nInstanceSync(
  lng: Locale,
  resources: Resource,
): i18n {
  const instance = createInstance()

  instance
    .use(initReactI18next)
    .use(getBackend())
    .init({
      ...getInitOptions(lng),
      resources,
      partialBundledLanguages: true,
    })

  return instance
}
