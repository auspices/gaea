import React from 'react'

import { Link } from '../../../../components/UI/Link'

export const ContentEntityHeaderImage = ({ image }) => {
  return (
    <>
      <Link href={image.url}>
        @{image.width}×{image.height}
      </Link>

      <Link
        href={`https://www.google.com/searchbyimage?&image_url=${image.url}`}
        target="_blank"
      >
        reverse image search
      </Link>
    </>
  )
}
