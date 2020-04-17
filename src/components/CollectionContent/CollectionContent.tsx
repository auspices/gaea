import React, { useCallback, useEffect, useRef, useState } from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Box, pillFocusMixin } from '@auspices/eos'
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
import { Z } from '../../util/zIndexes'

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
  transition: box-shadow 250ms ease;
  border-radius: 4px;

  &:focus {
    ${pillFocusMixin}
  }
`

enum Mode {
  Resting,
  Active,
  Open,
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

  const handleMouseEnter = useCallback(() => {
    if (mode === Mode.Open) return
    timer.current && clearTimeout(timer.current)
    setMode(Mode.Active)
  }, [mode])

  const handleMouseLeave = useCallback(() => {
    if (mode === Mode.Open) return
    timer.current = setTimeout(() => setMode(Mode.Resting), 100)
  }, [mode])

  const handleOpen = useCallback(() => setMode(Mode.Open), [])
  const handleClose = useCallback(() => setMode(Mode.Resting), [])

  useEffect(() => {
    return () => {
      timer.current && clearTimeout(timer.current)
    }
  }, [])

  return (
    <Container
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      to={hrefs.content(content.id)}
      {...rest}
    >
      {mode !== Mode.Resting && (
        <Box position="absolute" top={3} right={3} zIndex={Z.DROPDOWN}>
          <ContextMenu onOpen={handleOpen} onClose={handleClose}>
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
              remove {content.entity.__typename.toLowerCase()}
            </RemoveFromCollection>
          </ContextMenu>
        </Box>
      )}

      <CollectionContentEntity entity={content.entity} />
    </Container>
  )
}
