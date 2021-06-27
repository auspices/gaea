import React from 'react'
import { gql } from 'graphql-tag'
import { useInView } from 'react-intersection-observer'
import { ResponsiveImage } from '@auspices/eos'
import { CollectionContentEntityImageFragment } from '../../../generated/types/CollectionContentEntityImageFragment'

export const COLLECTION_CONTENT_ENTITY_IMAGE_FRAGMENT = gql`
  fragment CollectionContentEntityImageFragment on Image {
    id
    title
    thumbnail: resized(width: 300, height: 300, quality: 85) {
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

export const CollectionContentEntityImage: React.FC<CollectionContentEntityImageProps> =
  ({ image, ...rest }) => {
    const [ref, inView] = useInView({ triggerOnce: true })
    return (
      <>
        {/* TODO: styled-components typings with forwardRef appear to be broken? */}
        <span ref={ref} />

        <ResponsiveImage
          srcs={
            inView ? [image.thumbnail.urls._1x, image.thumbnail.urls._2x] : []
          }
          alt={image.title}
          aspectWidth={image.thumbnail.width}
          aspectHeight={image.thumbnail.height}
          maxWidth={image.thumbnail.width}
          maxHeight={image.thumbnail.height}
          backgroundColor="tertiary"
          {...rest}
        />
      </>
    )
  }
