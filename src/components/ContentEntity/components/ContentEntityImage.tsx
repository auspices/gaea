import React from 'react'
import { gql } from 'graphql-tag'
import { Box, ResponsiveImage } from '@auspices/eos'
import { ContentEntityImageFragment } from '../../../generated/types/ContentEntityImageFragment'

export const CONTENT_ENTITY_IMAGE_FRAGMENT = gql`
  fragment ContentEntityImageFragment on Image {
    id
    title
    url
    placeholder: resized(width: 50, height: 50, blur: 10) {
      urls {
        src: _1x
      }
    }
    resized(width: 900, height: 900, quality: 95) {
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
      flex="1"
      display="flex"
      width="100%"
      alignItems={['flex-start', 'flex-start', 'center']}
      justifyContent="center"
      {...rest}
    >
      <ResponsiveImage
        indicator
        placeholder={image.placeholder.urls.src}
        srcs={[image.resized.urls._1x, image.resized.urls._2x]}
        alt={image.title}
        aspectWidth={image.resized.width}
        aspectHeight={image.resized.height}
        maxWidth={image.resized.width}
        maxHeight={image.resized.height}
      />
    </Box>
  )
}
