import gql from 'graphql-tag'
import React from 'react'
import { Divider } from '@auspices/eos'
import { ContextMenu, ContextMenuProps } from './ContextMenu'
import {
  ReorderAction,
  RepositionCollectionContent,
} from './RepositionCollectionContent'
import { RemoveFromCollection } from './RemoveFromCollection'
import { CollectionContentContextMenuContentFragment } from '../generated/types/CollectionContentContextMenuContentFragment'
import { CollectionContentContextMenuCollectionFragment } from '../generated/types/CollectionContentContextMenuCollectionFragment'

export const COLLECTION_CONTENT_CONTEXT_MENU_COLLECTION_FRAGMENT = gql`
  fragment CollectionContentContextMenuCollectionFragment on Collection {
    id
    counts {
      contents
    }
  }
`

export const COLLECTION_CONTENT_CONTEXT_MENU_CONTENT_FRAGMENT = gql`
  fragment CollectionContentContextMenuContentFragment on Content {
    id
    position
    entity {
      __typename
    }
  }
`

type CollectionContentContextMenuProps = ContextMenuProps & {
  collection: CollectionContentContextMenuCollectionFragment
  content: CollectionContentContextMenuContentFragment
}

export const CollectionContentContextMenu: React.FC<CollectionContentContextMenuProps> = ({
  collection,
  content,
  ...rest
}) => {
  return (
    <ContextMenu {...rest}>
      {content.position !== 0 && (
        <RepositionCollectionContent
          contentId={content.id}
          action={ReorderAction.MOVE_TO_TOP}
        />
      )}

      {content.position !== collection.counts.contents - 1 && (
        <RepositionCollectionContent
          contentId={content.id}
          action={ReorderAction.MOVE_TO_BOTTOM}
        />
      )}

      <Divider />

      {content.position !== 0 && (
        <RepositionCollectionContent
          contentId={content.id}
          action={ReorderAction.MOVE_UP}
        />
      )}

      {content.position !== collection.counts.contents - 1 && (
        <RepositionCollectionContent
          contentId={content.id}
          action={ReorderAction.MOVE_DOWN}
        />
      )}

      <Divider />

      <RemoveFromCollection collectionId={collection.id} contentId={content.id}>
        remove {content.entity.__typename.toLowerCase()}
      </RemoveFromCollection>
    </ContextMenu>
  )
}