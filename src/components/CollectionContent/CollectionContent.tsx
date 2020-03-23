import React, { useCallback, useState } from 'react'
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
  hrefs: any // TODO
}

export const CollectionContent: React.FC<CollectionContentProps> = ({
  content,
  collectionId,
  hrefs,
  ...rest
}) => {
  const [mode, setMode] = useState(Mode.Resting)

  const handleMouseEnter = useCallback(() => setMode(Mode.Active), [])
  const handleMouseLeave = useCallback(() => setMode(Mode.Resting), [])

  return (
    <Container
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      to={hrefs.content(content)}
      {...rest}
    >
      {mode === Mode.Active && (
        <ContextMenu position="absolute" top={0} right={0}>
          <RemoveFromCollection
            collectionId={collectionId}
            contentId={content.id}
          >
            delete this {content.entity.__typename.toLowerCase()}
          </RemoveFromCollection>

          <RepositionCollectionContent
            contentId={content.id}
            action={ReorderAction.MOVE_TO_TOP}
            borderTop="1px solid"
            borderColor="hint"
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
        </ContextMenu>
      )}

      <CollectionContentEntity entity={content.entity} />
    </Container>
  )
}
