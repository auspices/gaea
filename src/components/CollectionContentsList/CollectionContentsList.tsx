import React from 'react'
import gql from 'graphql-tag'
import { Box, BoxProps } from '@auspices/eos'
import { CollectionContentsListFragment } from '../../generated/types/CollectionContentsListFragment'

export const COLLECTION_CONTENTS_LIST_FRAGMENT = gql`
  fragment CollectionContentsListFragment on Collection {
    id
    contents(page: $page, per: $per) {
      id
    }
  }
`

type CollectionContentsListProps = BoxProps & {
  collection: CollectionContentsListFragment
}

export const CollectionContentsList: React.FC<CollectionContentsListProps> = ({
  collection,
  ...rest
}) => {
  return (
    <Box {...rest}>
      {collection.contents.map((content) => {
        return <Box key={content.id}>{content.id}</Box>
      })}
    </Box>
  )
}
