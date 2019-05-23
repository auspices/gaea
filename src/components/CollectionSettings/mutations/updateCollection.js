import gql from 'graphql-tag'

import { collectionSettingsFragment } from 'components/CollectionSettings/fragments/collectionSettings'

export const updateCollectionMutation = gql`
  mutation updateCollection($id: ID!, $title: String, $metadata: RawJson) {
    updateCollection(
      input: { id: $id, title: $title, metadata: $metadata, replace: true }
    ) {
      collection {
        ...CollectionSettings
      }
    }
  }
  ${collectionSettingsFragment}
`
