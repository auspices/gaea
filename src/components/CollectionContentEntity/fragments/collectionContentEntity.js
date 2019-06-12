import gql from 'graphql-tag'

import { collectionContentEntityImageFragment } from 'components/CollectionContentEntity/components/CollectionContentEntityImage/fragments/collectionContentEntityImage'
import { collectionContentEntityTextFragment } from 'components/CollectionContentEntity/components/CollectionContentEntityText/fragments/collectionContentEntityText'
import { collectionContentEntityLinkFragment } from 'components/CollectionContentEntity/components/CollectionContentEntityLink/fragments/collectionContentEntityLink'

export const collectionContentEntityFragment = gql`
  fragment CollectionContentEntity on Entity {
    ... on Text {
      ...CollectionContentEntityText
    }
    ... on Image {
      ...CollectionContentEntityImage
    }
    ... on Link {
      ...CollectionContentEntityLink
    }
  }
  ${collectionContentEntityImageFragment}
  ${collectionContentEntityTextFragment}
  ${collectionContentEntityLinkFragment}
`
