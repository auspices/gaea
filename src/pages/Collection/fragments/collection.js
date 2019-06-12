import gql from 'graphql-tag'

import { collectionSettingsFragment } from 'components/CollectionSettings/fragments/collectionSettings'
import { collectionContentEntityFragment } from 'components/CollectionContentEntity/fragments/collectionContentEntity'

export default gql`
  fragment Collection on Collection {
    id
    slug
    title
    counts {
      contents
    }
    contents(page: $page, per: $per) {
      id
      entity {
        ...CollectionContentEntity
      }
    }
    ...CollectionSettings
  }
  ${collectionSettingsFragment}
  ${collectionContentEntityFragment}
`
