import React, { useState, useCallback } from 'react'
import styled from 'styled-components'

import Link from 'components/UI/Link'
import { CollectionContentContextMenu } from 'components/CollectionContentContextMenu'
import RemoveFromCollection from 'components/RemoveFromCollection'
import CollectionContentEntity from 'components/CollectionContentEntity'

const Container = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

export default ({ content, collectionId, hrefs, page, per, ...rest }) => {
  const [mode, setMode] = useState('resting')

  const handleMouseEnter = useCallback(() => setMode('hover'), [])
  const handleMouseLeave = useCallback(() => setMode('resting'), [])

  return (
    <Container
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      display="block"
      width="100%"
      height="100%"
      position="relative"
      hoverStyle="NONE"
      to={hrefs.content(content)}
      {...rest}
    >
      <CollectionContentEntity entity={content.entity} />

      {mode === 'hover' && (
        <CollectionContentContextMenu position="absolute" top={0} right={0}>
          <RemoveFromCollection
            fontSize={0}
            collectionId={collectionId}
            contentId={content.id}
            page={page}
            per={per}
          >
            delete this {content.entity.__typename.toLowerCase()}
          </RemoveFromCollection>
        </CollectionContentContextMenu>
      )}
    </Container>
  )
}
