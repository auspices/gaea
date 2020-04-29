const GLYPH_ENDPOINT = 'https://glyph.labs.auspic.es'

export const useHrefs = () => {
  return {
    root: () => '/',
    login: () => '/login',
    account: () => '/account',
    collections: () => `/xs`,
    collection: (id: string) => `/xs/${id}`,
    collectionSettings: (id: string) => `/xs/${id}/settings`,
    content: (id: number) => `/x/${id}`,
    data: (key: string) => `${GLYPH_ENDPOINT}/graph/${key}`,
  }
}
