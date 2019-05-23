import gql from 'graphql-tag'

import headerFragment from 'components/Header/fragments/header'
import { collectionSettingsFragment } from 'components/CollectionSettings/fragments/collectionSettings'

export const collectionSettingsQuery = gql`
  query CollectionSettings($id: ID!) {
    me {
      ...Header
      __typename
      id
      username
      collection(id: $id) {
        __typename
        id
        slug
        ...CollectionSettings
      }
    }
  }
  ${headerFragment}
  ${collectionSettingsFragment}
`
