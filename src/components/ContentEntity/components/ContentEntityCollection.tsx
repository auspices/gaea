import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Box, BoxProps } from '@auspices/eos'
import { CollectionPreview } from '../../CollectionPreview'
import { useHrefs } from '../../../hooks'
import { ContentEntityCollectionFragment } from '../../../generated/types/ContentEntityCollectionFragment'

const Container = styled(Box)``

export const CONTENT_ENTITY_COLLECTION_FRAGMENT = gql`
  fragment ContentEntityCollectionFragment on Collection {
    id
    title
    slug
    updatedAt(relative: true)
    counts {
      contents
    }
  }
`

type ContentEntityCollectionProps = BoxProps & {
  collection: ContentEntityCollectionFragment
}

export const ContentEntityCollection: React.FC<ContentEntityCollectionProps> = ({
  collection,
  ...rest
}) => {
  const hrefs = useHrefs()
  return (
    <Container
      as={Link}
      to={hrefs.collection(collection.slug)}
      display="flex"
      flexDirection="column"
      width="100%"
      height="100%"
      flex={1}
      px={4}
      py={3}
      my={4}
      borderRadius={4}
      border="1px solid"
      borderColor="border"
      color="primary"
      {...rest}
    >
      <Box>{collection.title}</Box>

      <Box color="tertiary">{collection.counts.contents || '∅'}</Box>

      <CollectionPreview
        id={collection.id}
        cellSizePx="200px"
        cellGap={4}
        my={5}
      />

      <Box
        color="tertiary"
        fontSize={0}
        display="flex"
        flex="1"
        alignItems="flex-end"
      >
        {collection.updatedAt}
      </Box>
    </Container>
  )
}
