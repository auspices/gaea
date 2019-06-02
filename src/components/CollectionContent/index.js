import React, { useState } from 'react'
import styled from 'styled-components'

import Box from 'components/UI/Box'
import Link from 'components/UI/Link'
import { CollectionContentContextMenu } from 'components/CollectionContentContextMenu'
import RemoveFromCollection from 'components/RemoveFromCollection'
import CollectionContentEntity from 'components/CollectionContentEntity'

const Container = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
`

export default ({ content, collectionId, hrefs, page, per, ...rest }) => {
  const [mode, setMode] = useState('resting')

  return (
    <Container
      onMouseEnter={() => setMode('hover')}
      onMouseLeave={() => setMode('resting')}
      {...rest}
    >
      <Link display="block" position="relative" to={hrefs.content(content)}>
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
              delete this {content.__typename.toLowerCase()}
            </RemoveFromCollection>
          </CollectionContentContextMenu>
        )}
      </Link>
    </Container>
  )
}
