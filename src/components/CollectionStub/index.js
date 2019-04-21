import React from 'react';
import styled from 'styled-components';

import Box from 'components/UI/Box';
import Link from 'components/UI/Link';

const Container = styled(Link).attrs({
  px: 6,
  py: 5,
})`
  position: relative;
  display: flex;
  justify-content: space-between;
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
    border-color: blue;
    z-index: 1;
    color: blue;
    text-decoration: none;
  }
`;

export default ({ collection }) => (
  <Container to={`/collections/${collection.id}`}>
    <Box display="flex">
      {collection.title}

      <Box color="lightgray" ml={6}>
        {collection.counts.contents || 'empty'}
      </Box>
    </Box>

    <Box color="lightgray">
      {collection.updatedAt}
    </Box>
  </Container>
);
