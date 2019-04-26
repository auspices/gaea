import React from 'react'

import Thumbnail from '../../../Thumbnail'

export default ({ content }) => {
  switch (content.__typename) {
    case 'Image':
      return <Thumbnail image={content} />
    default:
      return content.__typename
  }
}
