import React from 'react'
import styled from 'styled-components'

import Box from 'components/UI/Box'
import CollectionStub from 'components/CollectionStub'

const Container = styled(Box)``

export default ({ collections, ...rest }) => (
  <Container {...rest}>
    {collections.map(collection => (
      <CollectionStub
        key={`CollectionStub:${collection.id}`}
        collection={collection}
      />
    ))}
  </Container>
)
