'use client'

import './client'

import type { Resource } from 'i18next'
import type { ReactNode } from 'react'
import { useSSR } from 'react-i18next'

import type { Locale } from './settings'

export function I18nProvider({
  children,
  locale,
  resources,
}: {
  children: ReactNode
  locale: Locale
  resources?: Resource | null
}) {
  if (!resources) {
    return <>{children}</>
  }

  return (
    <I18nHydrator locale={locale} resources={resources}>
      {children}
    </I18nHydrator>
  )
}

function I18nHydrator({
  locale,
  resources,
  children,
}: {
  children: ReactNode
  locale: Locale
  resources: Resource
}) {
  useSSR(resources, locale)

  return <>{children}</>
}
