import React from 'react'
import gql from 'graphql-tag'
import { ResponsiveImage } from '@auspices/eos'
import { CollectionContentEntityImageFragment } from '../../../../generated/types/CollectionContentEntityImageFragment'

export const COLLECTION_CONTENT_ENTITY_IMAGE_FRAGMENT = gql`
  fragment CollectionContentEntityImageFragment on Image {
    id
    title
    resized(width: 250, height: 250) {
      width
      height
      urls {
        _1x
        _2x
      }
    }
  }
`

type CollectionContentEntityImageProps = {
  image: CollectionContentEntityImageFragment
}

export const CollectionContentEntityImage: React.FC<CollectionContentEntityImageProps> = ({
  image,
  ...rest
}) => {
  return (
    <ResponsiveImage
      srcs={[image.resized.urls._1x, image.resized.urls._2x]}
      srcSet={`${image.resized.urls._1x} 1x, ${image.resized.urls._2x} 2x`}
      alt={image.title}
      aspectWidth={image.resized.width}
      aspectHeight={image.resized.height}
      maxWidth={image.resized.width}
      maxHeight={image.resized.height}
      backgroundColor="tertiary"
      {...rest}
    />
  )
}
