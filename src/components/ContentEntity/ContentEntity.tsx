import React from 'react'
import { gql } from 'graphql-tag'
import { ContentEntityFragment } from '../../generated/types/ContentEntityFragment'
import {
  CONTENT_ENTITY_IMAGE_FRAGMENT,
  ContentEntityImage,
} from './components/ContentEntityImage'
import {
  CONTENT_ENTITY_TEXT_FRAGMENT,
  ContentEntityText,
} from './components/ContentEntityText'
import {
  CONTENT_ENTITY_LINK_FRAGMENT,
  ContentEntityLink,
} from './components/ContentEntityLink'
import {
  CONTENT_ENTITY_COLLECTION_FRAGMENT,
  ContentEntityCollection,
} from './components/ContentEntityCollection'
import {
  CONTENT_ENTITY_ATTACHMENT_FRAGMENT,
  ContentEntityAttachment,
} from './components/ContentEntityAttachment'

export const CONTENT_ENTITY_FRAGMENT = gql`
  fragment ContentEntityFragment on Entity {
    ...ContentEntityImageFragment
    ...ContentEntityTextFragment
    ...ContentEntityLinkFragment
    ...ContentEntityCollectionFragment
    ...ContentEntityAttachmentFragment
  }
  ${CONTENT_ENTITY_IMAGE_FRAGMENT}
  ${CONTENT_ENTITY_TEXT_FRAGMENT}
  ${CONTENT_ENTITY_LINK_FRAGMENT}
  ${CONTENT_ENTITY_COLLECTION_FRAGMENT}
  ${CONTENT_ENTITY_ATTACHMENT_FRAGMENT}
`

export type ContentEntityProps = {
  entity: ContentEntityFragment
}

export const ContentEntity: React.FC<ContentEntityProps> = ({
  entity,
  ...rest
}) => {
  switch (entity.__typename) {
    case 'Image':
      return <ContentEntityImage image={entity} {...rest} />
    case 'Text':
      return <ContentEntityText text={entity} {...rest} />
    case 'Link':
      return <ContentEntityLink link={entity} {...rest} />
    case 'Collection':
      return <ContentEntityCollection collection={entity} {...rest} />
    case 'Attachment':
      return <ContentEntityAttachment attachment={entity} {...rest} />
  }
}
