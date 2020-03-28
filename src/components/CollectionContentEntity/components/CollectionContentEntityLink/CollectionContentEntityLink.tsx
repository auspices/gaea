import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Box, BoxProps } from '@auspices/eos'
import { CollectionContentEntityLinkFragment } from '../../../../generated/types/CollectionContentEntityLinkFragment'

export const COLLECTION_CONTENT_ENTITY_LINK_FRAGMENT = gql`
  fragment CollectionContentEntityLinkFragment on Link {
    id
    url
    name: toString(length: 30, from: CENTER)
  }
`

const Container = styled(Box)`
  color: blue;
  text-align: center;
`

type CollectionContentEntityLinkProps = BoxProps & {
  link: CollectionContentEntityLinkFragment
}

export const CollectionContentEntityLink: React.FC<CollectionContentEntityLinkProps> = ({
  link,
  ...rest
}) => <Container {...rest}>{link.name}</Container>
