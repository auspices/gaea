import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import {
  AspectRatioBox,
  Box,
  BoxProps,
  color,
  EmptyFrame,
  Grid,
  GridProps,
  Image,
} from '@auspices/eos'
import {
  CollectionPreviewQuery,
  CollectionPreviewQueryVariables,
} from '../../generated/types/CollectionPreviewQuery'

const MiniGrid = styled(Grid)<GridProps & { ready: boolean }>`
  position: relative;
  overflow: hidden;
  opacity: 0;
  transition: opacity 1s;

  ${({ ready }) =>
    ready &&
    css`
      opacity: 1;
    `}

  &:after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 75%;
    background: linear-gradient(
      ${color('background', 0.001)} 0%,
      ${color('background')} 100%
    );
  }
`

const Thumb = styled(AspectRatioBox)`
  overflow: hidden;
`

const Line: React.FC<{ color?: string }> = React.memo(({ color = 'hint' }) => (
  <Box
    bg={color}
    width={`${Math.floor(Math.random() * Math.floor(90))}%`}
    height="2px"
    mb="2px"
  />
))

const Text: React.FC<BoxProps & { length: number }> = React.memo(
  ({ length, ...rest }) => {
    return (
      <Box {...rest}>
        <Line />
        <Line />
        <Line />
        {length > 100 && (
          <>
            <Line />
            <Line />
            <Line />
            <Line />
          </>
        )}
      </Box>
    )
  }
)

export const COLLECTION_PREVIEW_FRAGMENT = gql`
  fragment CollectionPreviewFragment on Collection {
    id
    contents(per: $per) {
      id
      entity {
        __typename
        ... on Image {
          id
          width
          height
          placeholder: resized(width: 50, height: 50, blur: 10) {
            urls {
              src: _1x
            }
          }
        }
        ... on Text {
          id
          length
        }
        ... on Link {
          id
        }
        ... on Collection {
          id
        }
      }
    }
  }
`

export const COLLECTION_PREVIEW_QUERY = gql`
  query CollectionPreviewQuery($id: ID!, $per: Int) {
    me {
      id
      collection(id: $id) {
        ...CollectionPreviewFragment
      }
    }
  }
  ${COLLECTION_PREVIEW_FRAGMENT}
`

export type CollectionPreviewProps = Omit<GridProps, 'cellSize'> & {
  id: number
  per?: number
  cellSizePx: string
}

export const CollectionPreview: React.FC<CollectionPreviewProps> = React.memo(
  ({ id, per = 24, cellSizePx, cellGap = 2, ...rest }) => {
    const { data, loading, error } = useQuery<
      CollectionPreviewQuery,
      CollectionPreviewQueryVariables
    >(COLLECTION_PREVIEW_QUERY, {
      variables: { id: `${id}`, per: 16 },
    })

    const [ready, setReady] = useState(false)

    useEffect(() => {
      setTimeout(() => setReady(!loading))
    }, [loading])

    if (error) return null
    if (loading || !data) return null

    const {
      me: { collection },
    } = data

    return (
      <MiniGrid ready={ready} cellSize={cellSizePx} cellGap={cellGap} {...rest}>
        {collection.contents.map(({ entity }) => {
          switch (entity.__typename) {
            case 'Image':
              return (
                <Thumb
                  key={entity.id}
                  aspectWidth={entity.width}
                  aspectHeight={entity.height}
                  maxWidth={parseInt(cellSizePx, 10)}
                  maxHeight={parseInt(cellSizePx, 10)}
                  backgroundColor="hint"
                >
                  <Image
                    srcs={[entity.placeholder.urls.src]}
                    width="100%"
                    height="100%"
                  />
                </Thumb>
              )
            case 'Text':
              return (
                <Text
                  key={entity.id}
                  width="100%"
                  height="100%"
                  length={entity.length}
                >
                  {entity.length}
                </Text>
              )
            case 'Link':
              return (
                <EmptyFrame
                  key={entity.id}
                  width="100%"
                  height="100%"
                  color="external"
                  strokeWidth={0.75}
                  outline
                />
              )
            case 'Collection':
              return (
                <Box
                  key={entity.id}
                  border="1px solid"
                  borderColor="border"
                  borderRadius={2}
                  width="100%"
                  height="100%"
                  p={2}
                >
                  <Line color="border" />
                </Box>
              )
            default:
              return null
          }
        })}
      </MiniGrid>
    )
  }
)
