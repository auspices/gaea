import { curry } from 'lodash'

export const login = '/login'

export const home = curry(user => `/${user.slug}/xs`)

export const collections = curry(user => `/${user.slug}/xs`)

export const collection = curry((user, xs) => `/${user.slug}/xs/${xs.slug}`)

export const content = curry((user, x) => `/${user.slug}/x/${x.id}`)

export const sampleCollectionContent = curry(
  (user, xs) => `/${user.slug}/xs/${xs.slug}/sample`
)

export const generate = (...args) => ({
  login,
  home: home(...args),
  collections: collections(...args),
  collection: collection(...args),
  content: content(...args),
  sampleCollectionContent: sampleCollectionContent(...args),
})
