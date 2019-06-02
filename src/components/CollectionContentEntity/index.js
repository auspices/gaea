import React from 'react'

import Thumbnail from 'components/Thumbnail'

export default ({ entity }) => {
  switch (entity.__typename) {
    case 'Image':
      return <Thumbnail image={entity} />
    default:
      return entity.__typename
  }
}
