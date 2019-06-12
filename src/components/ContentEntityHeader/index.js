import React from 'react'

import { ContentEntityHeaderImage } from './components/ContentEntityHeaderImage'
import { ContentEntityHeaderText } from './components/ContentEntityHeaderText'
import { ContentEntityHeaderLink } from './components/ContentEntityHeaderLink'

export const ContentEntityHeader = ({ entity }) => {
  switch (entity.__typename) {
    case 'Image':
      return <ContentEntityHeaderImage image={entity} />
    case 'Text':
      return <ContentEntityHeaderText text={entity} />
    case 'Link':
      return <ContentEntityHeaderLink link={entity} />
    default:
      return null
  }
}
