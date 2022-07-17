import { useMemo } from 'react'
import { matchPath, useLocation } from 'react-router'
import { PATTERNS } from './useHrefs'

export const useMatchesPath = () => {
  const { pathname } = useLocation()

  const matches = useMemo(
    () => ({
      collections: matchPath({ path: PATTERNS.collections }, pathname),
      collection: matchPath({ path: PATTERNS.collection }, pathname),
      content: matchPath({ path: PATTERNS.content }, pathname),
    }),
    [pathname]
  )

  return { matches }
}
