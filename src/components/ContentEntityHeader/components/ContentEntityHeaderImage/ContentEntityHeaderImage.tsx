import React from 'react'
import gql from 'graphql-tag'
import { Button } from '@auspices/eos'
import { ContentEntityHeaderImageFragment } from '../../../../generated/types/ContentEntityHeaderImageFragment'

export const CONTENT_ENTITY_HEADER_IMAGE_FRAGMENT = gql`
  fragment ContentEntityHeaderImageFragment on Image {
    id
    url
    width
    height
  }
`

type ContentEntityHeaderImageProps = {
  image: ContentEntityHeaderImageFragment
}

export const ContentEntityHeaderImage: React.FC<ContentEntityHeaderImageProps> = ({
  image,
  ...rest
}) => {
  return (
    <>
      <Button as="a" href={image.url} flex="1" {...rest}>
        @{image.width}×{image.height}
      </Button>

      <Button
        as="a"
        href={`https://www.google.com/searchbyimage?&image_url=${image.url}`}
        target="_blank"
        {...rest}
      >
        reverse image search
      </Button>
    </>
  )
}
