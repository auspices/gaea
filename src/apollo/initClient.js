import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import jwtDecode from 'jwt-decode'

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

export default () =>
  new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
