import React from 'react'
import gql from 'graphql-tag'
import { Box, Stack, StackProps } from '@auspices/eos'
import { CollectionContentsListFragment } from '../generated/types/CollectionContentsListFragment'
import {
  COLLECTION_CONTENT_CONTEXT_MENU_COLLECTION_FRAGMENT,
  COLLECTION_CONTENT_CONTEXT_MENU_CONTENT_FRAGMENT,
  CollectionContentContextMenu,
} from './CollectionContentContextMenu'

export const COLLECTION_CONTENTS_LIST_FRAGMENT = gql`
  fragment CollectionContentsListFragment on Collection {
    id
    ...CollectionContentContextMenuCollectionFragment
    contents(page: $page, per: $per) {
      id
      ...CollectionContentContextMenuContentFragment
    }
  }
  ${COLLECTION_CONTENT_CONTEXT_MENU_CONTENT_FRAGMENT}
  ${COLLECTION_CONTENT_CONTEXT_MENU_COLLECTION_FRAGMENT}
`

type CollectionContentsListProps = StackProps & {
  collection: CollectionContentsListFragment
}

export const CollectionContentsList: React.FC<CollectionContentsListProps> = ({
  collection,
  ...rest
}) => {
  return (
    <Stack spacing={4} {...rest}>
      {collection.contents.map((content) => {
        return (
          <Box key={content.id} border="1px solid" position="relative">
            {content.id}

            <CollectionContentContextMenu
              position="absolute"
              top={0}
              right={0}
              collection={collection}
              content={content}
            />
          </Box>
        )
      })}
    </Stack>
  )
}
