import gql from 'graphql-tag'

export const collectionContentEntityTextFragment = gql`
  fragment CollectionContentEntityText on Text {
    id
    body
  }
`
