import gql from 'graphql-tag'

export const contentEntityHeaderLinkFragment = gql`
  fragment ContentEntityHeaderLink on Link {
    id
    name
    url
  }
`
