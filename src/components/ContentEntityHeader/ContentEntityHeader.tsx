import gql from 'graphql-tag'
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
import { ContentEntityHeaderFragment } from '../../generated/types/ContentEntityHeaderFragment'

export const CONTENT_ENTITY_HEADER_FRAGMENT = gql`
  fragment ContentEntityHeaderFragment on Entity {
    ... on Image {
      ...ContentEntityHeaderImageFragment
    }
    ... on Text {
      ...ContentEntityHeaderTextFragment
    }
    ... on Link {
      ...ContentEntityHeaderLinkFragment
    }
  }
  ${CONTENT_ENTITY_HEADER_IMAGE_FRAGMENT}
  ${CONTENT_ENTITY_HEADER_TEXT_FRAGMENT}
  ${CONTENT_ENTITY_HEADER_LINK_FRAGMENT}
`

type ContentEntityHeader = {
  entity: ContentEntityHeaderFragment
}

export const ContentEntityHeader: React.FC<ContentEntityHeader> = ({
  entity,
}) => {
  switch (entity.__typename) {
    case 'Image':
      return <ContentEntityHeaderImage image={entity} />
    case 'Text':
      return <ContentEntityHeaderText text={entity} />
    case 'Link':
      return <ContentEntityHeaderLink link={entity} />
  }
}
