import gql from 'graphql-tag'

import { collectionContentEntityImageFragment } from 'components/CollectionContentEntity/components/CollectionContentEntityImage/fragments/collectionContentEntityImage'
import { collectionContentEntityTextFragment } from 'components/CollectionContentEntity/components/CollectionContentEntityText/fragments/collectionContentEntityText'
import { collectionSettingsFragment } from 'components/CollectionSettings/fragments/collectionSettings'

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
        ... on Text {
          ...CollectionContentEntityText
        }
        ... on Image {
          ...CollectionContentEntityImage
        }
      }
    }
    ...CollectionSettings
  }
  ${collectionContentEntityImageFragment}
  ${collectionContentEntityTextFragment}
  ${collectionSettingsFragment}
`
