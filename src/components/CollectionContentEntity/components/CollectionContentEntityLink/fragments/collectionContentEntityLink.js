import gql from 'graphql-tag'

export const collectionContentEntityLinkFragment = gql`
  fragment CollectionContentEntityLink on Link {
    id
    url
    name
  }
`
