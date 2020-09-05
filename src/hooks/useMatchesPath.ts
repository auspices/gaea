import { useMemo } from 'react'
import { matchPath, useLocation } from 'react-router'
import { PATTERNS } from './useHrefs'

export const useMatchesPath = () => {
  const { pathname } = useLocation()

  const matches = useMemo(
    () => ({
      collections: matchPath(pathname, {
        path: PATTERNS.collections,
        exact: true,
      }),
      collection: matchPath(pathname, {
        path: PATTERNS.collection,
        exact: true,
      }),
      content: matchPath(pathname, { path: PATTERNS.content, exact: true }),
    }),
    [pathname]
  )

  return { matches }
}
