export const GLYPH_ENDPOINT = 'https://glyph.labs.auspic.es'

export const root = () => '/'
export const login = () => '/login'
export const account = () => '/account'
export const collections = () => `/xs`
export const collection = (id: string) => `/xs/${id}`
export const collectionSettings = (id: string) => `/xs/${id}/settings`
export const content = (id: number) => `/x/${id}`
export const data = (key: string) => `${GLYPH_ENDPOINT}/graph/${key}`

export const HREFS = {
  root,
  login,
  account,
  collections,
  collection,
  collectionSettings,
  content,
  data,
}

export const useHrefs = () => {
  return HREFS
}
