import React, { useState } from 'react'
import styled from 'styled-components'

import Box from 'components/UI/Box'
import Link from 'components/UI/Link'
import RemoveFromCollection from 'components/RemoveFromCollection'
import CollectionContentInner from './components/CollectionContentInner'

const Container = styled(Box).attrs({
  pb: 6,
  px: 6,
})``

export default ({ content, collection, hrefs, page, per, ...rest }) => {
  const [mode, setMode] = useState('resting')

  return (
    <Container
      onMouseEnter={() => setMode('hover')}
      onMouseLeave={() => setMode('resting')}
      {...rest}
    >
      <Link display="block" position="relative" to={hrefs.content(content)}>
        <CollectionContentInner content={content} />

        {mode === 'hover' && (
          <RemoveFromCollection
            position="absolute"
            top={0}
            right={0}
            collectionId={collection.id}
            contentId={content.id}
            contentType={content.__typename.toUpperCase()}
            page={page}
            per={per}
          />
        )}
      </Link>
    </Container>
  )
}
