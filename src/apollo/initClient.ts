import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { from } from 'apollo-link'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import jwtDecode from 'jwt-decode'

import introspectionQueryResultData from './fragmentTypes.json'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
})

const authLink = setContext((_, { headers }) => {
  const jwt = localStorage.getItem('jwt')

  // No token: Return the default headers
  if (!jwt) return { headers }

  const now = Date.now().valueOf() / 1000
  const { exp } = jwtDecode(jwt)

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
    cache: new InMemoryCache({ fragmentMatcher }),
  })
