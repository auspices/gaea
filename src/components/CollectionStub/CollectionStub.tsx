import React from 'react'
import styled from 'styled-components'
import { Box, Pill, PillProps } from '@auspices/eos'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'

export const COLLECTION_STUB_FRAGMENT = gql`
  fragment CollectionStubFragment on Collection {
    id
    slug
    title
    updatedAt(relative: true)
    counts {
      contents
    }
  }
`

const Title = styled(Box)``
const Count = styled(Box)``
const Delta = styled(Box)``

const Container = styled(Pill)<PillProps>`
  text-decoration: none;

  &:hover {
    > ${Title} {
      text-decoration: underline;
    }

    > ${Count} {
      color: gray;
    }

    > ${Delta} {
      color: gray;
      text-decoration: underline;
    }
  }
`

export type CollectionStubProps = {
  collection: any
  hrefs: any
}

export const CollectionStub: React.FC<CollectionStubProps> = ({
  collection,
  hrefs,
  ...rest
}) => {
  return (
    <Container as={Link} to={hrefs.collection(collection)} {...rest}>
      <Title>{collection.title}</Title>

      <Count mx={4} color="lightgray">
        {collection.counts.contents || '∅'}
      </Count>

      <Delta flex="1" textAlign="right" color="lightgray" fontSize={0}>
        {collection.updatedAt}
      </Delta>
    </Container>
  )
}
