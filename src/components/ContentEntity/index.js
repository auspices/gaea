import React from 'react'

import { ContentEntityImage } from './components/ContentEntityImage'
import { ContentEntityText } from './components/ContentEntityText'

export const ContentEntity = ({ entity, ...rest }) => {
  switch (entity.__typename) {
    case 'Image':
      return <ContentEntityImage image={entity} {...rest} />
    case 'Text':
      return <ContentEntityText text={entity} {...rest} />
    default:
      return entity.__typename
  }
}
