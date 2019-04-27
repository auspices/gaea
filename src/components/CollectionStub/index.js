import React from 'react'
import styled from 'styled-components'

import Box from 'components/UI/Box'
import Link from 'components/UI/Link'

const Title = styled.span``

const Container = styled(Link).attrs({
  px: 6,
  py: 5,
})`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  margin-top: -1px;
  border: 1px solid;

  &:first-child {
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  }

  &:last-child {
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:hover {
    text-decoration: none;

    ${Title} {
      text-decoration: underline;
    }
  }
`

export default ({ collection, hrefs }) => (
  <Container to={hrefs.collection(collection)}>
    <Box display="flex">
      <Title>{collection.title}</Title>

      <Box color="lightgray" ml={6}>
        {collection.counts.contents || 'empty'}
      </Box>
    </Box>

    <Box fontSize={0} color="lightgray">
      {collection.updatedAt}
    </Box>
  </Container>
)
