import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Box, BoxProps } from '@auspices/eos'
import { CollectionPreview } from '../../../CollectionPreview'
import { CollectionContentEntityCollectionFragment } from '../../../../generated/types/CollectionContentEntityCollectionFragment'

export const COLLECTION_CONTENT_ENTITY_COLLECTION_FRAGMENT = gql`
  fragment CollectionContentEntityCollectionFragment on Collection {
    id
    slug
    title
    updatedAt(relative: true)
    name
    counts {
      contents
    }
  }
`

const Delta = styled(Box).attrs({
  color: 'tertiary',
  fontSize: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  flex: 1,
})`
  opacity: 0;
  transition: opacity 125ms, transform 125ms;
  transform: translateY(-2%);
`

const Container = styled(Box)`
  overflow: hidden;
  transform: translateZ(0);

  &:hover {
    > ${Delta} {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

type CollectionContentEntityCollectionProps = BoxProps & {
  collection: CollectionContentEntityCollectionFragment
}

export const CollectionContentEntityCollection: React.FC<CollectionContentEntityCollectionProps> = ({
  collection,
  ...rest
}) => (
  <Container
    border="1px solid"
    borderColor="primary"
    borderRadius={4}
    color="primary"
    height="100%"
    width="100%"
    display="flex"
    flexDirection="column"
    justifyContent="flex-start"
    py={3}
    px={4}
    {...rest}
  >
    <Box>{collection.name}</Box>

    <Box color="tertiary">{collection.counts.contents || '∅'}</Box>

    <CollectionPreview id={collection.id} cellSizePx="48px" my={5} />

    <Delta>{collection.updatedAt}</Delta>
  </Container>
)
