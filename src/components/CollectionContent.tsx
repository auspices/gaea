import React, { useCallback, useEffect, useRef, useState } from 'react'
import gql from 'graphql-tag'
import { Box, Divider, File } from '@auspices/eos'
import { ContextMenu } from './ContextMenu'
import { RemoveFromCollection } from './RemoveFromCollection'
import {
  ReorderAction,
  RepositionCollectionContent,
} from './RepositionCollectionContent'
import {
  COLLECTION_CONTENT_ENTITY_FRAGMENT,
  CollectionContentEntity,
} from './CollectionContentEntity'
import { useHrefs } from '../hooks'
import { CollectionContentFragment } from '../generated/types/CollectionContentFragment'
import { CollectionContentCollectionFragment } from '../generated/types/CollectionContentCollectionFragment'
import { Z } from '../util/zIndexes'
import { useHistory } from 'react-router-dom'

export const MAX_WIDTH = 310

export const COLLECTION_CONTENT_COLLECTION_FRAGMENT = gql`
  fragment CollectionContentCollectionFragment on Collection {
    id
    counts {
      contents
    }
  }
`

export const COLLECTION_CONTENT_FRAGMENT = gql`
  fragment CollectionContentFragment on Content {
    id
    position
    entity {
      ... on Image {
        label: toString(length: 35, from: CENTER)
        width
        height
      }
      ... on Text {
        label: toString(length: 35, from: TAIL)
      }
      ... on Link {
        label: toString(length: 35, from: CENTER)
      }
      ... on Collection {
        label: toString(length: 35, from: CENTER)
      }
      ...CollectionContentEntityFragment
    }
  }
  ${COLLECTION_CONTENT_ENTITY_FRAGMENT}
`

enum Mode {
  Resting,
  Active,
  Open,
}

type CollectionContentProps = {
  collection: CollectionContentCollectionFragment
  content: CollectionContentFragment
}

export const CollectionContent: React.FC<CollectionContentProps> = ({
  content,
  collection,
  ...rest
}) => {
  const [mode, setMode] = useState(Mode.Resting)

  const hrefs = useHrefs()
  const history = useHistory()

  const timer = useRef<ReturnType<typeof setTimeout>>()

  const handleMouseEnter = useCallback(() => {
    if (mode === Mode.Open) return
    timer.current && clearTimeout(timer.current)
    setMode(Mode.Active)
  }, [mode])

  const handleMouseLeave = useCallback(() => {
    if (mode === Mode.Open) return
    timer.current = setTimeout(() => setMode(Mode.Resting), 100)
  }, [mode])

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
  }

  const handleDoubleClick = () => {
    history.push(hrefs.content(content.id))
  }

  useEffect(() => {
    return () => {
      timer.current && clearTimeout(timer.current)
    }
  }, [])

  const meta = (() => {
    switch (content.entity.__typename) {
      case 'Image':
        return `${content.entity.width}×${content.entity.height}`
      default:
        return undefined
    }
  })()

  return (
    <File
      maxWidth={MAX_WIDTH}
      position="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      name={content.entity.label}
      meta={meta}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      // @ts-ignore
      as="a"
      href={hrefs.content(content.id)}
      {...rest}
    >
      {mode !== Mode.Resting && (
        <Box position="absolute" top={3} right={3} zIndex={Z.DROPDOWN}>
          <ContextMenu>
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

            <RemoveFromCollection
              collectionId={collection.id}
              contentId={content.id}
            >
              remove {content.entity.__typename.toLowerCase()}
            </RemoveFromCollection>
          </ContextMenu>
        </Box>
      )}

      <CollectionContentEntity entity={content.entity} />
    </File>
  )
}