import React from 'react'

import { ContentEntityImage } from './components/ContentEntityImage'
import { ContentEntityText } from './components/ContentEntityText'

export const ContentEntity = ({ entity }) => {
  switch (entity.__typename) {
    case 'Image':
      return <ContentEntityImage image={entity} />
    case 'Text':
      return <ContentEntityText text={entity} />
    default:
      return entity.__typename
  }
}
