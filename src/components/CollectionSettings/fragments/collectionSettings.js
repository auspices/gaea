import gql from 'graphql-tag'

export const collectionSettingsFragment = gql`
  fragment CollectionSettings on Collection {
    __typename
    id
    title
    metadata
  }
`
