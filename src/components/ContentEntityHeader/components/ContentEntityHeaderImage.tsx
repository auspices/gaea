import React from 'react'
import { gql } from 'graphql-tag'
import { Button, Caret, Dropdown, PaneOption, Truncate } from '@auspices/eos'
import { ContentEntityHeaderImageFragment } from '../../../generated/graphql'
import { Z } from '../../../util/zIndexes'

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

export const ContentEntityHeaderImage: React.FC<
  ContentEntityHeaderImageProps
> = ({ image, ...rest }) => {
  return (
    <Dropdown
      label={({ open, ...rest }) => (
        <Button width="100%" {...rest}>
          <Truncate title={image.name}>{image.name}</Truncate>
          <Caret ml={3} direction={open ? 'up' : 'down'} />
        </Button>
      )}
      zIndex={Z.DROPDOWN}
      flex="1"
      {...rest}
    >
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
