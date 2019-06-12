import React from 'react'

import { ContentEntityImage } from './components/ContentEntityImage'
import { ContentEntityText } from './components/ContentEntityText'
import { ContentEntityLink } from './components/ContentEntityLink'

export const ContentEntity = ({ entity, ...rest }) => {
  switch (entity.__typename) {
    case 'Image':
      return <ContentEntityImage image={entity} {...rest} />
    case 'Text':
      return <ContentEntityText text={entity} {...rest} />
    case 'Link':
      return <ContentEntityLink link={entity} {...rest} />
    default:
      return entity.__typename
  }
}
