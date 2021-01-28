import React from 'react'
import gql from 'graphql-tag'
import { useInView } from 'react-intersection-observer'
import { ResponsiveImage } from '@auspices/eos'
import { CollectionContentEntityImageFragment } from '../../../../generated/types/CollectionContentEntityImageFragment'

export const COLLECTION_CONTENT_ENTITY_IMAGE_FRAGMENT = gql`
  fragment CollectionContentEntityImageFragment on Image {
    id
    title
    resized(width: 300, height: 300, quality: 85) {
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
  const [ref, inView] = useInView({ triggerOnce: true })
  return (
    <>
      {/* TODO: styled-components typings with forwardRef appear to be broken? */}
      <span ref={ref} />

      <ResponsiveImage
        srcs={inView ? [image.resized.urls._1x, image.resized.urls._2x] : []}
        alt={image.title}
        aspectWidth={image.resized.width}
        aspectHeight={image.resized.height}
        maxWidth={image.resized.width}
        maxHeight={image.resized.height}
        backgroundColor="tertiary"
        {...rest}
      />
    </>
  )
}
