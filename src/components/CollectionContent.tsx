import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { gql } from 'graphql-tag'
import { File } from '@auspices/eos'
import {
  COLLECTION_CONTENT_ENTITY_FRAGMENT,
  CollectionContentEntity,
} from './CollectionContentEntity'
import { useHrefs } from '../hooks'
import {
  CollectionContentCollectionFragment,
  CollectionContentContentFragment,
} from '../generated/graphql'
import { useNavigate } from 'react-router-dom'
import {
  COLLECTION_CONTENT_CONTEXT_MENU_COLLECTION_FRAGMENT,
  COLLECTION_CONTENT_CONTEXT_MENU_CONTENT_FRAGMENT,
  CollectionContentContextMenu,
} from './CollectionContentContextMenu'

export const MAX_WIDTH = 310

export const COLLECTION_CONTENT_COLLECTION_FRAGMENT = gql`
  fragment CollectionContentCollectionFragment on Collection {
    ...CollectionContentContextMenuCollectionFragment
  }
  ${COLLECTION_CONTENT_CONTEXT_MENU_COLLECTION_FRAGMENT}
`

export const COLLECTION_CONTENT_CONTENT_FRAGMENT = gql`
  fragment CollectionContentContentFragment on Content {
    id
    ...CollectionContentContextMenuContentFragment
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
        slug
        label: toString(length: 35, from: CENTER)
      }
      ... on Attachment {
        label: toString(length: 35, from: CENTER)
      }
      ...CollectionContentEntityFragment
    }
  }
  ${COLLECTION_CONTENT_ENTITY_FRAGMENT}
  ${COLLECTION_CONTENT_CONTEXT_MENU_CONTENT_FRAGMENT}
`

enum Mode {
  Resting,
  Active,
  Open,
}

type CollectionContentProps = {
  collection?: CollectionContentCollectionFragment
  content: CollectionContentContentFragment
}

export const CollectionContent: React.FC<CollectionContentProps> = ({
  content,
  collection,
  ...rest
}) => {
  const [mode, setMode] = useState(Mode.Resting)

  const hrefs = useHrefs()
  const navigate = useNavigate()

  const href =
    content.entity.__typename === 'Collection'
      ? hrefs.collection(content.entity.slug)
      : hrefs.content(content.id)

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
    navigate(href)
  }

  useEffect(() => {
    return () => {
      timer.current && clearTimeout(timer.current)
    }
  }, [])

  const meta = useMemo(() => {
    switch (content.entity.__typename) {
      case 'Image':
        return `${content.entity.width}×${content.entity.height}`
      default:
        return undefined
    }
  }, [content.entity])

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
      href={href}
      {...rest}
    >
      {collection && mode !== Mode.Resting && (
        <CollectionContentContextMenu
          position="absolute"
          top={3}
          right={3}
          collection={collection}
          content={content}
        />
      )}

      <CollectionContentEntity entity={content.entity} />
    </File>
  )
}
