import i18next from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'

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

i18next
  .use(initReactI18next)
  .use(getBackend())
  .init({
    ...getInitOptions(),
    partialBundledLanguages: true,
  })
