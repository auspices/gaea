import React from 'react'
import { gql } from 'graphql-tag'
import {
  COLLECTION_CONTENT_ENTITY_TEXT_FRAGMENT,
  CollectionContentEntityText,
} from './components/CollectionContentEntityText'
import {
  COLLECTION_CONTENT_ENTITY_IMAGE_FRAGMENT,
  CollectionContentEntityImage,
} from './components/CollectionContentEntityImage'
import {
  COLLECTION_CONTENT_ENTITY_LINK_FRAGMENT,
  CollectionContentEntityLink,
} from './components/CollectionContentEntityLink'
import {
  COLLECTION_CONTENT_ENTITY_COLLECTION_FRAGMENT,
  CollectionContentEntityCollection,
} from './components/CollectionContentEntityCollection'
import { CollectionContentEntityFragment } from '../../generated/types/CollectionContentEntityFragment'

export const COLLECTION_CONTENT_ENTITY_FRAGMENT = gql`
  fragment CollectionContentEntityFragment on Entity {
    ...CollectionContentEntityTextFragment
    ...CollectionContentEntityImageFragment
    ...CollectionContentEntityLinkFragment
    ...CollectionContentEntityCollectionFragment
  }
  ${COLLECTION_CONTENT_ENTITY_TEXT_FRAGMENT}
  ${COLLECTION_CONTENT_ENTITY_IMAGE_FRAGMENT}
  ${COLLECTION_CONTENT_ENTITY_LINK_FRAGMENT}
  ${COLLECTION_CONTENT_ENTITY_COLLECTION_FRAGMENT}
`

type CollectionContentEntityProps = {
  entity: CollectionContentEntityFragment
}

export const CollectionContentEntity: React.FC<CollectionContentEntityProps> =
  ({ entity }) => {
    switch (entity.__typename) {
      case 'Image':
        return <CollectionContentEntityImage image={entity} />
      case 'Text':
        return <CollectionContentEntityText text={entity} />
      case 'Link':
        return <CollectionContentEntityLink link={entity} />
      case 'Collection':
        return <CollectionContentEntityCollection collection={entity} />
    }
  }
