import React from 'react'
import gql from 'graphql-tag'
import { Box } from '@auspices/eos'
import { Image } from '../../../Image'
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
    <Box
      mt="1px"
      width={image.resized.width}
      height={image.resized.height}
      backgroundColor="lightgray"
    >
      <Image
        srcs={[image.resized.urls._1x, image.resized.urls._2x]}
        alt={image.title}
        width={image.resized.width}
        height={image.resized.height}
        {...rest}
      />
    </Box>
  )
}
