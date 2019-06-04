import React from 'react'

import { ContentEntityHeaderImage } from './components/ContentEntityHeaderImage'
import { ContentEntityHeaderText } from './components/ContentEntityHeaderText'

export const ContentEntityHeader = ({ entity }) => {
  switch (entity.__typename) {
    case 'Image':
      return <ContentEntityHeaderImage image={entity} />
    case 'Text':
      return <ContentEntityHeaderText text={entity} />
    default:
      return null
  }
}
