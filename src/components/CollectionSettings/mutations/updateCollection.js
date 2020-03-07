import gql from 'graphql-tag'

import { collectionSettingsFragment } from '../../../components/CollectionSettings/fragments/collectionSettings'

export const updateCollectionMutation = gql`
  mutation updateCollection($id: ID!, $title: String, $metadata: JSON) {
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
