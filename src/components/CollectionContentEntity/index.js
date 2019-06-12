import React from 'react'

import { CollectionContentEntityText } from './components/CollectionContentEntityText'
import { CollectionContentEntityImage } from './components/CollectionContentEntityImage'
import { CollectionContentEntityLink } from './components/CollectionContentEntityLink'

export default ({ entity }) => {
  switch (entity.__typename) {
    case 'Image':
      return <CollectionContentEntityImage image={entity} />
    case 'Text':
      return <CollectionContentEntityText text={entity} />
    case 'Link':
      return <CollectionContentEntityLink link={entity} />
    default:
      return entity.__typename
  }
}
