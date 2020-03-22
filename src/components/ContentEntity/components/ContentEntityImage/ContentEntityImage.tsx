import React from 'react'
import gql from 'graphql-tag'
import { ResponsiveImage } from '@auspices/eos'
import { ContentEntityImageFragment } from '../../../../generated/types/ContentEntityImageFragment'

export const CONTENT_ENTITY_IMAGE_FRAGMENT = gql`
  fragment ContentEntityImageFragment on Image {
    id
    title
    url
    width
    height
    resized(width: 900, height: 900) {
      width
      height
      urls {
        _1x
        _2x
      }
    }
  }
`

type ContentEntityImageProps = {
  image: ContentEntityImageFragment
}

export const ContentEntityImage: React.FC<ContentEntityImageProps> = ({
  image,
  ...rest
}) => {
  return (
    <ResponsiveImage
      srcs={[image.resized.urls._1x, image.resized.urls._2x]}
      alt={image.title}
      aspectWidth={image.resized.width}
      aspectHeight={image.resized.height}
      maxWidth={image.resized.width}
      maxHeight={image.resized.height}
      {...rest}
    />
  )
}
