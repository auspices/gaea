import React, { useCallback, useEffect, useRef, useState } from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ContextMenu } from '../ContextMenu'
import { RemoveFromCollection } from '../RemoveFromCollection'
import {
  ReorderAction,
  RepositionCollectionContent,
} from '../RepositionCollectionContent'
import {
  COLLECTION_CONTENT_ENTITY_FRAGMENT,
  CollectionContentEntity,
} from '../CollectionContentEntity'
import { useHrefs } from '../../hooks'
import { CollectionContentFragment } from '../../generated/types/CollectionContentFragment'

export const COLLECTION_CONTENT_FRAGMENT = gql`
  fragment CollectionContentFragment on Content {
    id
    entity {
      ...CollectionContentEntityFragment
    }
  }
  ${COLLECTION_CONTENT_ENTITY_FRAGMENT}
`

const Container = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  position: relative;
`

enum Mode {
  Resting,
  Active,
}

type CollectionContentProps = {
  content: CollectionContentFragment
  collectionId: number
}

export const CollectionContent: React.FC<CollectionContentProps> = ({
  content,
  collectionId,
  ...rest
}) => {
  const [mode, setMode] = useState(Mode.Resting)

  const hrefs = useHrefs()

  const timer = useRef<number | null>()

  const handleMouseOver = useCallback(() => {
    timer.current && clearTimeout(timer.current)
    setMode(Mode.Active)
  }, [])

  const handleMouseOut = useCallback(() => {
    timer.current = setTimeout(() => setMode(Mode.Resting), 100)
  }, [])

  useEffect(() => {
    return () => {
      timer.current && clearTimeout(timer.current)
    }
  }, [])

  return (
    <Container
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      to={hrefs.content(content.id)}
      {...rest}
    >
      {mode === Mode.Active && (
        <ContextMenu position="absolute" top="0.5rem" right="0.5rem">
          <RepositionCollectionContent
            contentId={content.id}
            action={ReorderAction.MOVE_TO_TOP}
          />

          <RepositionCollectionContent
            contentId={content.id}
            action={ReorderAction.MOVE_TO_BOTTOM}
          />

          <RepositionCollectionContent
            contentId={content.id}
            action={ReorderAction.MOVE_DOWN}
            borderTop="1px solid"
            borderColor="hint"
          />

          <RepositionCollectionContent
            contentId={content.id}
            action={ReorderAction.MOVE_UP}
          />

          <RemoveFromCollection
            collectionId={collectionId}
            contentId={content.id}
            borderTop="1px solid"
            borderColor="hint"
          >
            delete this {content.entity.__typename.toLowerCase()}
          </RemoveFromCollection>
        </ContextMenu>
      )}

      <CollectionContentEntity entity={content.entity} />
    </Container>
  )
}
