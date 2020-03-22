import React from 'react'
import gql from 'graphql-tag'
import { Box, BoxProps } from '@auspices/eos'
import { Image } from '../../../Image'
import { CollectionContentEntityImageFragment } from '../../../../generated/types/CollectionContentEntityImageFragment'

export const COLLECTION_CONTENT_ENTITY_IMAGE_FRAGMENT = gql`
  fragment CollectionContentEntityImageFragment on Image {
    id
    title
    resized(width: 200, height: 200) {
      width
      height
      urls {
        _1x
        _2x
      }
    }
  }
`

type CollectionContentEntityImageProps = BoxProps & {
  image: CollectionContentEntityImageFragment
}

export const CollectionContentEntityImage: React.FC<CollectionContentEntityImageProps> = ({
  image,
  ...rest
}) => {
  return (
    <Box
      width={image.resized.width}
      height={image.resized.height}
      backgroundColor="lightgray"
      overflow="hidden"
      borderRadius={4}
      {...rest}
    >
      <Image
        srcs={[image.resized.urls._1x, image.resized.urls._2x]}
        srcSet={`${image.resized.urls._1x} 1x, ${image.resized.urls._2x} 2x`}
        alt={image.title}
        width={image.resized.width}
        height={image.resized.height}
      />
    </Box>
  )
}
