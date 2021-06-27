import React from 'react'
import { gql } from 'graphql-tag'
import { Box, Stack, StackProps } from '@auspices/eos'
import { CollectionContentsListFragment } from '../generated/types/CollectionContentsListFragment'
import {
  COLLECTION_CONTENT_CONTEXT_MENU_COLLECTION_FRAGMENT,
  COLLECTION_CONTENT_CONTEXT_MENU_CONTENT_FRAGMENT,
  CollectionContentContextMenu,
} from './CollectionContentContextMenu'
import { CONTENT_ENTITY_FRAGMENT, ContentEntity } from './ContentEntity'

export const COLLECTION_CONTENTS_LIST_FRAGMENT = gql`
  fragment CollectionContentsListFragment on Collection {
    id
    ...CollectionContentContextMenuCollectionFragment
    contents(page: $page, per: $per) {
      id
      ...CollectionContentContextMenuContentFragment
      entity {
        ...ContentEntityFragment
      }
    }
  }
  ${COLLECTION_CONTENT_CONTEXT_MENU_CONTENT_FRAGMENT}
  ${COLLECTION_CONTENT_CONTEXT_MENU_COLLECTION_FRAGMENT}
  ${CONTENT_ENTITY_FRAGMENT}
`

type CollectionContentsListProps = StackProps & {
  collection: CollectionContentsListFragment
}

export const CollectionContentsList: React.FC<CollectionContentsListProps> = ({
  collection,
  ...rest
}) => {
  return (
    <Stack spacing={8} maxWidth={1200} mx="auto" {...rest}>
      {collection.contents.map((content) => {
        return (
          <Box key={content.id} position="relative">
            <ContentEntity entity={content.entity} />

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
