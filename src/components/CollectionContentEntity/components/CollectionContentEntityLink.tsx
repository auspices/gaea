import React from 'react'
import styled from 'styled-components'
import { gql } from 'graphql-tag'
import { Box, BoxProps } from '@auspices/eos'
import { CollectionContentEntityLinkFragment } from '../../../generated/types/CollectionContentEntityLinkFragment'

export const COLLECTION_CONTENT_ENTITY_LINK_FRAGMENT = gql`
  fragment CollectionContentEntityLinkFragment on Link {
    id
    url
    name: toString(length: 30, from: CENTER)
  }
`

const Container = styled(Box)``

type CollectionContentEntityLinkProps = BoxProps & {
  link: CollectionContentEntityLinkFragment
}

export const CollectionContentEntityLink: React.FC<CollectionContentEntityLinkProps> =
  ({ link, ...rest }) => (
    <Container
      border="1px solid"
      borderColor="external"
      borderRadius={4}
      color="external"
      fontSize={0}
      height="100%"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      {...rest}
    >
      <Box px={4} py={3} borderTop="1px solid" borderColor="external">
        {link.name}
      </Box>
    </Container>
  )
