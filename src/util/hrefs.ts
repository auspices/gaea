import { curry } from 'lodash'

export const login = '/login'

export const home = curry((user: { slug: string }) => `/${user.slug}/xs`)

export const collections = curry((user: { slug: string }) => `/${user.slug}/xs`)

export const collection = curry(
  (user: { slug: string }, xs: { slug: string }) =>
    `/${user.slug}/xs/${xs.slug}`
)

export const content = curry(
  (user: { slug: string }, x: { id: string | number }) =>
    `/${user.slug}/x/${x.id}`
)

// TODO: this is stupid
// @ts-ignore
export const generate = (...args) => ({
  login,
  // @ts-ignore
  home: home(...args),
  // @ts-ignore
  collections: collections(...args),
  // @ts-ignore
  collection: collection(...args),
  // @ts-ignore
  content: content(...args),
})
