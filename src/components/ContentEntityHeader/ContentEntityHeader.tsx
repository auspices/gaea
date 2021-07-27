import { gql } from 'graphql-tag'
import React from 'react'
import {
  CONTENT_ENTITY_HEADER_IMAGE_FRAGMENT,
  ContentEntityHeaderImage,
} from './components/ContentEntityHeaderImage'
import {
  CONTENT_ENTITY_HEADER_TEXT_FRAGMENT,
  ContentEntityHeaderText,
} from './components/ContentEntityHeaderText'
import {
  CONTENT_ENTITY_HEADER_LINK_FRAGMENT,
  ContentEntityHeaderLink,
} from './components/ContentEntityHeaderLink'
import {
  CONTENT_ENTITY_HEADER_COLLECTION_FRAGMENT,
  ContentEntityHeaderCollection,
} from './components/ContentEntityHeaderCollection'
import {
  CONTENT_ENTITY_HEADER_ATTACHMENT_FRAGMENT,
  ContentEntityHeaderAttachment,
} from './components/ContentEntityHeaderAttachment'
import { ContentEntityHeaderFragment } from '../../generated/types/ContentEntityHeaderFragment'

export const CONTENT_ENTITY_HEADER_FRAGMENT = gql`
  fragment ContentEntityHeaderFragment on Entity {
    ...ContentEntityHeaderImageFragment
    ...ContentEntityHeaderTextFragment
    ...ContentEntityHeaderLinkFragment
    ...ContentEntityHeaderCollectionFragment
    ...ContentEntityHeaderAttachmentFragment
  }
  ${CONTENT_ENTITY_HEADER_IMAGE_FRAGMENT}
  ${CONTENT_ENTITY_HEADER_TEXT_FRAGMENT}
  ${CONTENT_ENTITY_HEADER_LINK_FRAGMENT}
  ${CONTENT_ENTITY_HEADER_COLLECTION_FRAGMENT}
  ${CONTENT_ENTITY_HEADER_ATTACHMENT_FRAGMENT}
`

type ContentEntityHeaderProps = {
  entity: ContentEntityHeaderFragment
}

export const ContentEntityHeader: React.FC<ContentEntityHeaderProps> = ({
  entity,
  ...rest
}) => {
  switch (entity.__typename) {
    case 'Image':
      return <ContentEntityHeaderImage image={entity} {...rest} />
    case 'Text':
      return <ContentEntityHeaderText text={entity} {...rest} />
    case 'Link':
      return <ContentEntityHeaderLink link={entity} {...rest} />
    case 'Collection':
      return <ContentEntityHeaderCollection collection={entity} {...rest} />
    case 'Attachment':
      return <ContentEntityHeaderAttachment attachment={entity} {...rest} />
  }
}
