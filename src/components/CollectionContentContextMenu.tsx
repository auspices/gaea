import { gql } from 'graphql-tag'
import React from 'react'
import { Divider, PaneOption } from '@auspices/eos'
import { ContextMenu, ContextMenuProps } from './ContextMenu'
import {
  ReorderAction,
  RepositionCollectionContent,
} from './RepositionCollectionContent'
import { RemoveFromCollection } from './RemoveFromCollection'
import {
  CollectionContentContextMenuCollectionFragment,
  CollectionContentContextMenuContentFragment,
} from '../generated/graphql'
import { Link } from 'react-router-dom'
import { useHrefs } from '../hooks'

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

export const CollectionContentContextMenu: React.FC<
  CollectionContentContextMenuProps
> = ({ collection, content, ...rest }) => {
  const hrefs = useHrefs()

  return (
    <ContextMenu {...rest}>
      <PaneOption as={Link} to={hrefs.content(content.id)}>
        view {content.entity.__typename.toLowerCase()}
      </PaneOption>

      <Divider />

      {content.position !== 0 && (
        <RepositionCollectionContent
          contentId={content.id}
          action={ReorderAction.MoveToTop}
        />
      )}

      {content.position !== collection.counts.contents - 1 && (
        <RepositionCollectionContent
          contentId={content.id}
          action={ReorderAction.MoveToBottom}
        />
      )}

      <Divider />

      {content.position !== 0 && (
        <RepositionCollectionContent
          contentId={content.id}
          action={ReorderAction.MoveUp}
        />
      )}

      {content.position !== collection.counts.contents - 1 && (
        <RepositionCollectionContent
          contentId={content.id}
          action={ReorderAction.MoveDown}
        />
      )}

      <Divider />

      <RemoveFromCollection collectionId={collection.id} contentId={content.id}>
        remove {content.entity.__typename.toLowerCase()}
      </RemoveFromCollection>
    </ContextMenu>
  )
}
