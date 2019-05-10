import { curry } from 'lodash'

export const login = '/login'

export const home = curry(user => `/${user.slug}/xs`)

export const collections = curry(user => `/${user.slug}/xs`)

export const collection = curry((user, xs) => `/${user.slug}/xs/${xs.slug}`)

export const collectionSettings = curry(
  (user, xs) => `/${user.slug}/xs/${xs.slug}/settings`
)

export const content = curry(
  (user, x) => `/${user.slug}/x/${x.__typename.toLowerCase()}/${x.id}`
)

export const generate = (...args) => ({
  login,
  home: home(...args),
  collections: collections(...args),
  collection: collection(...args),
  collectionSettings: collectionSettings(...args),
  content: content(...args),
})
