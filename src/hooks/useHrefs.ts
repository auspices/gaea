export const GLYPH_ENDPOINT = 'https://glyph.labs.auspic.es'

export const PATTERNS = {
  root: '/',
  login: '/login',
  register: '/register',
  subscribe: '/subscribe',
  account: '/account',
  collections: '/xs',
  newCollections: '/home',
  collection: '/xs/:id',
  collectionSettings: '/xs/:id/settings',
  content: '/x/:id',
  capture: '/capture',
}

export const root = () => PATTERNS.root
export const login = (redirectTo?: string) =>
  redirectTo
    ? `${PATTERNS.login}?redirectTo=${encodeURIComponent(redirectTo)}`
    : PATTERNS.login
export const register = () => PATTERNS.register
export const subscribe = () => PATTERNS.subscribe
export const account = () => PATTERNS.account
export const collections = () => PATTERNS.collections
export const collection = (id: string) => PATTERNS.collection.replace(':id', id)
export const collectionSettings = (id: string) =>
  PATTERNS.collectionSettings.replace(':id', id)
export const content = (id: number) =>
  PATTERNS.content.replace(':id', String(id))
export const data = (key: string) => `${GLYPH_ENDPOINT}/graph/${key}`
export const capture = () => PATTERNS.capture

export const HREFS = {
  root,
  login,
  account,
  collections,
  collection,
  collectionSettings,
  content,
  data,
  capture,
}

export const useHrefs = () => {
  return HREFS
}
