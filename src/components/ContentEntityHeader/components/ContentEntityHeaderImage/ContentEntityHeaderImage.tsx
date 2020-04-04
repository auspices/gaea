import React from 'react'
import gql from 'graphql-tag'
import { Dropdown, PaneOption } from '@auspices/eos'
import { ContentEntityHeaderImageFragment } from '../../../../generated/types/ContentEntityHeaderImageFragment'
import { Z } from 'util/zIndexes'

export const CONTENT_ENTITY_HEADER_IMAGE_FRAGMENT = gql`
  fragment ContentEntityHeaderImageFragment on Image {
    id
    url
    width
    height
    name: toString(length: 35, from: CENTER)
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
    <Dropdown label={image.name} zIndex={Z.DROPDOWN} flex="1" {...rest}>
      <PaneOption as="a" href={image.url} target="_blank">
        original (@{image.width}×{image.height})
      </PaneOption>

      <PaneOption
        as="a"
        href={`https://www.google.com/searchbyimage?&image_url=${image.url}`}
        target="_blank"
      >
        reverse image search
      </PaneOption>
    </Dropdown>
  )
}
