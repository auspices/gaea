import gql from 'graphql-tag'

export const contentEntityLinkFragment = gql`
  fragment ContentEntityLink on Link {
    id
    url
  }
`
