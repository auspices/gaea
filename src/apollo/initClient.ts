import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import jwtDecode from 'jwt-decode'

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
})

const authLink = setContext((_, { headers }) => {
  const jwt = localStorage.getItem('jwt')

  // No token: Return the default headers
  if (!jwt) return { headers }

  const now = Date.now().valueOf() / 1000
  const { exp } = jwtDecode<{ exp: number }>(jwt)

  if (now > exp) {
    // Token is expired: Remove the token from storage
    // and return the default headers
    localStorage.removeItem('jwt')
    return { headers }
  }

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${jwt}`,
    },
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.error(
        `[GraphQL error]: ${
          extensions?.code ? `Code: ${extensions.code}` : ''
        } Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    })
  }

  if (networkError) console.error(`[Network error]: ${networkError}`)
})

export const initClient = () =>
  new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache({
      possibleTypes: {
        Entity: ['Image', 'Text', 'Link', 'Collection', 'Attachment'],
      },
    }),
  })
