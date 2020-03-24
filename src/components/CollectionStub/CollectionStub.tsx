import React from 'react'
import styled from 'styled-components'
import { Box, Pill, PillProps } from '@auspices/eos'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { themeGet } from '@styled-system/theme-get'
import { useHrefs } from '../../hooks'
import { CollectionStubFragment } from '../../generated/types/CollectionStubFragment'

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
const Delta = styled(Box)`
  opacity: 0;
  transition: opacity 125ms;
`

const Container = styled(Pill)<PillProps>`
  text-decoration: none;

  &:hover {
    > ${Title} {
      text-decoration: underline;
    }

    > ${Count} {
      color: ${themeGet('colors.secondary')};
    }

    > ${Delta} {
      opacity: 1;
    }
  }
`

export type CollectionStubProps = {
  collection: CollectionStubFragment
}

export const CollectionStub: React.FC<CollectionStubProps> = ({
  collection,
  ...rest
}) => {
  const hrefs = useHrefs()

  return (
    <Container as={Link} to={hrefs.collection(collection.slug)} {...rest}>
      <Title>{collection.title}</Title>

      <Count mx={4} color="tertiary">
        {collection.counts.contents || '∅'}
      </Count>

      <Delta color="tertiary" fontSize={0}>
        {collection.updatedAt}
      </Delta>
    </Container>
  )
}
